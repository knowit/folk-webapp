const { DataplattformClient } = require('../dataplattform/lib');

module.exports = function () {
  return function (req, res, next) {

    if (!req.headers.authorization) {
      return res.sendStatus(403)
    }

    const accessToken = req.headers.authorization
      .split(/bearer/i)
      .pop()
      .trim();
    
    req.dataplattform = new DataplattformClient({ accessToken }),

    next();
  };
};
