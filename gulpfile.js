let gulp = require('gulp');     //загружаем модуль, присваиваем результат работы переменной gulp

let rename = require('gulp-rename');


//Таст для компиляции scss в css
let sass = require('gulp-sass');

gulp.task('scss', function () {     //пишем таск для gulpa на компеляцию, scss - имя команды
    return gulp.src('docs/scss/**/*.scss')     //находим все файлы, которые нужно конвертировать (*.scss - берем все файлы с расширением scss; **/*.scss - находит все папки с этим фалом)
        .pipe(sass({ outputStyle: 'compressed' }))     //метод pipe имеет плагины, мы выбираем sass(); {outputStyle: 'compressed'} – сжимает файлы в коде
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('docs/css'))     //прописываем, куда будут переходить скомпилированные файлы
        .pipe(browserSync.reload({ stream: true }))
});


//Таск для автоматич перезагрузки стр при изменен html
gulp.task('html', function () {
    return gulp.src('docs/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('script', function () {
    return gulp.src('docs/js/*.js')
        .pipe(browserSync.reload({ stream: true }))
});


//Таск для объединения всех js файлов
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');

gulp.task('js', function () {
    return gulp.src([                       //пишев в [] так так есть несколько путей файлов
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('docs/js'))
        .pipe(browserSync.reload({ stream: true }))
})


//Таск для плагина с автоматич перезагрузкой стр
let browserSync = require('browser-sync');

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "docs/"
        }
    });
});


//Таск для автоматического выполнения команды gulp scss
gulp.task('watch', function () {
    gulp.watch('docs/scss/**/*.scss', gulp.parallel('scss'))     //слежение за файлами, при выполнении таска. Если ы них будут изменения, запускаем таск scss
    gulp.watch('docs/*.html', gulp.parallel('html'))
    gulp.watch('docs/js/*.js', gulp.parallel('script'))
});


//Таск для параллельной работы нескольких тасков
gulp.task('default', gulp.parallel('scss', 'js', 'browser-sync', 'watch'))     //defoult - ключевое слово которое говорит: - при написании gulp в консоли, выполняем gulp.parallel

