var express = require('express');
var validator = require('email-validator');
var fs = require('fs');
var router = express.Router();

router.get('/latest', function (req, res) {
  fs.readFile('images/672.jpg', function (err, data) {
    if (err) throw err; // Fail if the file can't be read.
    res.writeHead(200, {
        'Content-Type': 'image/jpeg',
      });
    res.end(data); // Send the file data to the browser.
  });
});

router.get('/', function (req, res) {
  res.send('Home page');
});

router.post('/upload', function (req, res) {
  res.send('testing post upload');
});

module.exports = router;
