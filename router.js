var express = require('express');
var validator = require('email-validator');
var router = express.Router();

router.get('/latest', function (req, res) {
  res.send('testing get latest');
});

router.post('/upload', function (req, res) {
  res.send('testing post upload');
});

module.exports = router;
