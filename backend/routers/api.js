const express = require('express');
const dataplattform = require('../middlewares/dataplattform');
const dataRepository = require('../repository/data');

const router = express.Router();

router.use(dataplattform());
router.get('/data/:source', async function (req, res) {
  const data = await dataRepository[req.params.source]({
    dataplattformClient: req.dataplattform,
    queryStringParameters: req.query,
  });

  res.send(data);
});

module.exports = router;
