var express = require('express');
var router = require('./router.js');
var bodyParser = require('body-parser');
var app = express();

var myLogger = function (req, res, next) {
  var UTCstring = (new Date()).toUTCString();
  console.log(UTCstring + ': ' + req.method + ' ' + req.path + ' ' + JSON.stringify(req.body));

  next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log requests if IS_DEBUG is not empty
console.log('env var ' + process.env.IS_DEBUG);
if (process.env.IS_DEBUG)
  app.use(myLogger);

app.use(router);

app.listen(3000);
