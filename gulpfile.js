var gulp         = require('gulp');
var sass         = require('gulp-sass');
var csscomb      = require('gulp-csscomb');
var csso         = require('gulp-csso');
var cssbeautify  = require('gulp-cssbeautify');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var pxtorem      = require('postcss-pxtorem');
var mqpacker     = require("css-mqpacker");
var selector     = require('postcss-custom-selectors')
var rename       = require("gulp-rename");
var jade         = require("gulp-jade");

gulp.task('sass', function () {
    var processors = [
        autoprefixer({browsers: ['ie >= 8', 'last 3 versions', '> 2%']}),
        pxtorem({
            root_value: 14,
            selector_black_list: ['html'],
        }),
        mqpacker,
        selector
    ];

    gulp.src(['./scss/**/*.scss'])
        .pipe(sass({
            outputStyle: 'nested',
            errLogToConsole: true
        }))
        .pipe(postcss(processors))
        .pipe(csso())
        .pipe(cssbeautify({
            autosemicolon: true
        }))
        .pipe(csscomb())
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
})

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./test/**/*.jade', ['jade']);
});

gulp.task('default',['watch', 'sass', 'jade']);
