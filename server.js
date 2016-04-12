var express = require('express');
var router = require('./router.js');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var myLogger = function (req, res, next) {
  var UTCstring = (new Date()).toUTCString();
  console.log(UTCstring + ': ' + req.method + ' ' + req.path + ' ' + JSON.stringify(req.body));
  next();
};

// Setup port
// app.set('port', (process.env.PORT || 5000));

// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log('blah');

// Parse JSON requests
app.use(bodyParser.json());

app.use(myLogger);
app.use(router);

var port = process.env.PORT || 5000;

app.listen(port);
console.log('listening on ' + port);
