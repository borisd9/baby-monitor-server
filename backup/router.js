var express = require('express');
var fs = require('fs');
var inspect = require('util').inspect;
var Busboy = require('busboy');
var path = require('path');
var os = require('os');
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
  console.log('GET');

  res.render('home.ejs');

  // res.send('home page');
});

// Get data from the form
router.post('/upload', function (req, res) {

  // parse req
  var busboy = new Busboy({ headers: req.headers });

  // handle file upload
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);

      // Remove old file
      var files = fs.readdirSync(__dirname + '/images');

      if (files.length > 1) {
        console.log('error with number of files in /images');
        throw 'error';
      }

      fs.unlinkSync(__dirname + '/images/' + files[0]);

      console.log('removed old files');

      // Save file to /images path
      var saveTo = path.join(__dirname + '/images', path.basename(filename));
      file.pipe(fs.createWriteStream(saveTo));

      file.on('end', function () {
        console.log('File [' + fieldname + '] Finished');
      });
    });

  // handle field upload
  busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });

  // Finsihed parsing the form
  busboy.on('finish', function () {
      console.log('Done parsing form!');

      // res.writeHead(303, { Connection: 'close', Location: '/' });
      // res.end();
      res.send('done uploading files');
    });

  req.pipe(busboy);
});

module.exports = router;
