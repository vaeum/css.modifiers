// обьявляем переменные
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssbeautify  = require('gulp-cssbeautify');

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

        // плагин для форматирования css кода
        .pipe(cssbeautify())

        // указываем конечную папку
        .pipe(gulp.dest('./css'));
});

// список файлов для наблюдения
gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
});

// задача по-умолчанию
gulp.task('default',
    [
        'watch',
        'sass'
    ]
);
