var express = require('express');
var router = require('./router.js');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.port || 1337;

var myLogger = function (req, res, next) {
  var UTCstring = (new Date()).toUTCString();
  console.log(UTCstring + ': ' + req.method + ' ' + req.path + ' ' + JSON.stringify(req.body));

  next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(myLogger);

app.use(router);

app.listen(port);
