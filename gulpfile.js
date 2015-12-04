var gulp          = require('gulp');
var sass          = require('gulp-sass');
var csso          = require('gulp-csso');
var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');
var pxtorem       = require('postcss-pxtorem');
var mqpacker      = require("css-mqpacker");
var selector      = require('postcss-custom-selectors');
var perfectionist = require('perfectionist');
var rename        = require("gulp-rename");
var jade          = require("gulp-jade");

var processors = [
    autoprefixer({browsers: ['ie >= 8', 'last 3 versions', '> 2%']}),
    pxtorem({
        root_value: 14,
        selector_black_list: ['html']
    }),
    mqpacker,
    selector
];

gulp.task('sass', function () {

    gulp.src(['./scss/**/*.scss'])
        .pipe(sass({errLogToConsole: true}))
        .pipe(postcss(processors))
        .pipe(csso())
        .pipe(postcss([perfectionist({
            maxValueLength: false,
            maxAtRuleLength: false,
            maxSelectorLength: true
        })]))
        .pipe(gulp.dest('./dist'))

        .pipe(csso())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./dist"));
});

gulp.task('jade', function () {
    gulp.src(['./test/*.jade'])
        .pipe(jade())
        .pipe(gulp.dest("./test/"))
});

gulp.task('default',['sass', 'jade'], function(){
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./test/**/*.jade', ['jade']);
});
