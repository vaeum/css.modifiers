// обьявляем переменные
var gulp         = require('gulp');

// плагины для работы с css
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csscomb      = require('gulp-csscomb');
var csso         = require('gulp-csso');
var cssbeautify  = require('gulp-cssbeautify');
var cmq          = require('gulp-combine-media-queries');

// плагины для работы с файлами
var rename       = require("gulp-rename");

// задача для компиляции scss файлов
gulp.task('sass', function () {
    gulp.src(['./scss/**/*.scss'])

        // настройки sass плагина
        .pipe(sass({
            outputStyle: 'nested',
            errLogToConsole: true
        }))

        // настройки autoprefixer
        .pipe(autoprefixer(['ie >= 8', 'last 3 versions', '> 2%']))

        // плагины для форматирования css кода
        .pipe(cmq())
        // .pipe(csso(true))
        .pipe(csso())
        .pipe(cssbeautify({
            autosemicolon: true
        }))
        .pipe(csscomb())

        // указываем конечную папку
        .pipe(gulp.dest('./css'))

        // создаем сжатый файл
        .pipe(csso())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./css"));
});

// список файлов для наблюдения
gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
});

// задача по-умолчанию
gulp.task('default',['watch', 'sass']);
