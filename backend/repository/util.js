const crypto = require('crypto');
const AWS = require('aws-sdk');

const ssm = new AWS.SSM();

exports.getSecret = (name, { encrypted = false } = {}) => {
  return new Promise((resolve, reject) => {
    ssm.getParameter(
      {
        Name: name,
        WithDecryption: encrypted,
      },
      (err, data) => {
        if (err) reject(err);
        else resolve(data && data.Parameter ? data.Parameter.Value : null);
      }
    );
  });
};

exports.makeEmailUuid = (email, salt) => {
  const hmac = crypto.createHmac('sha256', salt);
  hmac.update(email);
  const sig = hmac.digest('hex');

  return [
    sig.substring(0, 8),
    sig.substring(8, 12),
    sig.substring(12, 16),
    sig.substring(16, 20),
    sig.substring(20, 32),
  ].join('-');
};

exports.groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );

exports.range = (x, y) =>
  Array.from(
    (function* () {
      while (x <= y) yield x++;
    })()
  );

exports.reStructCategories = (categories, compScores = [], motScores = []) => {
  //find the main categoreis
  const mainCategories = new Set(
    categories.flatMap((item) => Object.keys(item))
  );

  /**
   * returns the score of the category with name = name from
   * the array scores. kompOrMot is either "kompetanse" or
   * "motivasjon", depending on the score to find
   */
  const score = (name, scores, komOrMot) => {
    const thisCat = scores.find((obj) => {
      return obj['kategori'] === name;
    });
    const returnValue = thisCat ? thisCat[komOrMot] : 0;
    return returnValue || 0;
  };

  let catSet = [];

  const mainCats = [];

  mainCategories.forEach((name) => {
    const upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);
    mainCats.push({
      kategori: upperCaseName,
      kompetanse: score(upperCaseName, compScores, 'kompetanse'),
      motivasjon: score(upperCaseName, motScores, 'motivasjon')
    });
    const categoryObject = {
      [name]: [],
    };
    categories.forEach((item) => {
      const childName = item[name];
      if (childName) {
        // Create child category
        const childCategoryObject = {
          kategori: childName,
          kompetanse: score(childName, compScores, 'kompetanse'),
          motivasjon: score(childName, motScores, 'motivasjon')
        };
        categoryObject[name].push(childCategoryObject);
      }
    });
    catSet.push(categoryObject);
  });
  catSet.unshift({ Hovedkategorier: mainCats });
  catSet = catSet.reduce(function (cat, x) {
    for (var key in x) cat[key] = x[key];
    return cat;
  }, {});

  const setNames = Object.keys(catSet);

  return [catSet, setNames];
};
