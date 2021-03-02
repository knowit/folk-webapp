const crypto = require('crypto')
const AWS = require('aws-sdk')
AWS.config.update({ region: 'eu-central-1' })

const ssm = new AWS.SSM()

exports.getSecret = (name, { encrypted = false } = {}) => {
  return new Promise((resolve, reject) => {
    ssm.getParameter(
      {
        Name: name,
        WithDecryption: encrypted,
      },
      (err, data) => {
        if (err) reject(err)
        else resolve(data && data.Parameter ? data.Parameter.Value : null)
      }
    )
  })
}

exports.makeEmailUuid = (email, salt) => {
  const hmac = crypto.createHmac('sha256', salt)
  hmac.update(email)
  const sig = hmac.digest('hex')

  return [
    sig.substring(0, 8),
    sig.substring(8, 12),
    sig.substring(12, 16),
    sig.substring(16, 20),
    sig.substring(20, 32),
  ].join('-')
}

exports.groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  )

exports.range = (x, y) =>
  Array.from(
    (function* () {
      while (x <= y) yield x++
    })()
  )

exports.mergeEmployee = (array) => {
  const newArray = []
  const mergedIndexes = []
  array.forEach((current, j) => {
    current.customerArray = [{
      customer: current.customer,
      workOrderDescription: current.work_order_description,
      weight: current.weight,
    }]
    for (var i = j + 1; i < array.length; i++) {
      if (current.guid === array[i].guid && !mergedIndexes.includes(i)) {
        array[i].customerArray = [{
          customer: array[i].customer,
          workOrderDescription: array[i].work_order_description,
          weight: array[i].weight,
        }]
        array[i].customerArray = [...array[i].customerArray, ...current.customerArray]
        current = { ...current, ...array[i] }
        mergedIndexes.push(i)
      }
    }
    if (!mergedIndexes.includes(j)) {
      newArray.push(current)
      mergedIndexes.push(j)
    }
  })
  return newArray
}


exports.reStructCategories = (categories, compScores = [], motScores = []) => {
  //find the main categoreis
  const mainCategories = new Set(
    categories.flatMap((item) => Object.keys(item))
  )
  let catSet = []
  const mainCats = []

  // Merges the two arrays on the same category
  const mergedArrs = compScores.map((i) => {
    const found = motScores.find((j) => j.kategori === i.kategori)
    const mergedObj = { ...found, ...i }
    return mergedObj
  })

  mainCategories.forEach((name) => {
    mainCats.push(mergedArrs.find((obj) => {
      return obj['kategori'].toUpperCase() == name.toUpperCase()
    }))

    const categoryObject = {
      [name]: [],
    }
    categories.forEach((item) => {
      const childName = item[name]
      if (childName) {
        // Create child category
        const foundSubCat = mergedArrs.find((obj) => {
          return obj['kategori'].toUpperCase() === childName.toUpperCase()
        })
        categoryObject[name].push(foundSubCat)
      }
    })
    catSet.push(categoryObject)
  })
  catSet.unshift({ Hovedkategorier: mainCats })
  catSet = catSet.reduce(function (cat, x) {
    for (var key in x) cat[key] = x[key]
    return cat
  }, {})

  const setNames = Object.keys(catSet)

  return [catSet, setNames]
}
