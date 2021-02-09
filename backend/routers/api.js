const express = require('express');
const dataplattform = require('../middlewares/dataplattform');
const { handler } = require('./handler');

const router = express.Router();

router.use(dataplattform());
router.get('/data/:source', async (req, res) => {
  const response = await handler(req);
  // console.log("api response", response)
  res.send(response);
});

module.exports = router;
