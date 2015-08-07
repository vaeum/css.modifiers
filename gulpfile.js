// обьявляем переменные
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csscomb      = require('gulp-csscomb');
var csso         = require('gulp-csso');
var cssbeautify  = require('gulp-cssbeautify');
var cmq          = require('gulp-combine-media-queries');

// задача для компиляции scss файлов
gulp.task('sass', function () {
    gulp.src(['./scss/**/*.scss'])

        // настройки sass плагина
        .pipe(sass({
            outputStyle: 'nested',
            errLogToConsole: true
        }))

        // настройки autoprefixer
        .pipe(autoprefixer(
            'last 2 version',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
        ))

        // плагины для форматирования css кода
        .pipe(cmq())
        // .pipe(csso(true))
        .pipe(csso())
        .pipe(cssbeautify({
            autosemicolon: true
        }))
        .pipe(csscomb())

        // указываем конечную папку
        .pipe(gulp.dest('./css'));
});

// список файлов для наблюдения
gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
});

// задача по-умолчанию
gulp.task('default',['watch', 'sass']);
