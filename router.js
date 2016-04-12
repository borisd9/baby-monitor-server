var express = require('express');
var validator = require('email-validator');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('TEST');
});

module.exports = router;
