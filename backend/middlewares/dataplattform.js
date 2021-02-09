module.exports = function () {
  return function (req, res, next) {
    if (!req.headers.authorization) {
      return res.sendStatus(403);
    }

    req.accessToken = req.headers.authorization
      .split(/bearer/i)
      .pop()
      .trim();

    next();
  };
};
