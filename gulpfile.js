var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var precss = require('precss');
var autoreset = require('postcss-autoreset');
var reporter = require('postcss-reporter');
var lost = require('lost');
var sugarss = require('sugarss');
var initial = require('postcss-initial');

// styling

var alias = require('postcss-alias');
var crip = require('postcss-crip');
var magician = require('postcss-font-magician');
var center = require('postcss-center');
var position = require('postcss-position');
var size = require('postcss-size');

gulp.task('css', function () {
  var processors = [
    autoreset({
      all: initial
    }),
    alias,
    crip,
    magician,
    center,
    position,
    size,
    cssnext,
    precss,
    lost,
    reporter({ clearMessages: true }),
  ];
  return gulp.src('./src/styles-to-compile/*.css')
    .pipe(postcss(
      processors,
      {
        parser: sugarss
      }
    ))
    .pipe(gulp.dest('./src/'));
});

gulp.task('watch', function () {
  gulp.watch('./src/styles-to-compile/*.css', ['css']);
});
