var gulp          = require('gulp');
var sass          = require('gulp-sass');
var csso          = require('gulp-csso');
var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');
var mqpacker      = require("css-mqpacker");
var selector      = require('postcss-custom-selectors');
var perfectionist = require('perfectionist');
var rename        = require('gulp-rename');

// настройки автопрефиксера
var AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1'
];

var processors = [
    autoprefixer({browsers: AUTOPREFIXER_BROWSERS}),
    mqpacker,
    selector
];

gulp.task('scss', function () {

    return gulp.src(['./src/**/*.scss'])
        .pipe(sass({errLogToConsole: true}))
        .pipe(postcss(processors))
        .pipe(csso())
        .pipe(postcss([perfectionist()]))
        .pipe(gulp.dest('./dist'))

        .pipe(csso())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./dist"));
});

gulp.task('default',['scss'], function(){
    gulp.watch('./scss/**/*.scss', ['scss']);
});
