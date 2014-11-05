var express = require('express');
var router = express.Router();

// controller function!!!
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
