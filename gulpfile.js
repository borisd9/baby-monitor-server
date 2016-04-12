var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function () {
  nodemon({
    script: 'server.js',

    // if IS_DEBUG is not empty, output log
    env: { IS_DEBUG: 'debugging' },
  }).on('start');
});
