const crypto = require('crypto');
const AWS = require('aws-sdk');
AWS.config.update({
  region: 'eu-central-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
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
