const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./prod/"
        },
        port: 3000
    });
});

gulp.task('build', async function () {
    return [
        gulp.src('index.html')
            .pipe(gulp.dest('./prod/'))
            .pipe(browserSync.stream()),

        gulp.src('home.html')
            .pipe(gulp.dest('./prod/'))
            .pipe(browserSync.stream()),

        gulp.src('note.html')
            .pipe(gulp.dest('./prod/'))
            .pipe(browserSync.stream()),

        gulp.src('create_note.html')
            .pipe(gulp.dest('./prod/'))
            .pipe(browserSync.stream()),

        gulp.src('edit_note.html')
            .pipe(gulp.dest('./prod/'))
            .pipe(browserSync.stream()),

    ]
});


gulp.task('less', async function () {
    gulp.src([
        './source/styles.less'
    ])
        .pipe(less())
        .pipe(gulp.dest('./prod'));
});

gulp.task('bundle', async function () {
    gulp.src([
        './node_modules/angular/angular.min.js',
        './node_modules/@uirouter',
    ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./prod'));
});

gulp.task('scripts', async function () {
    gulp.src([
        './source/app.js',
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./prod'));
});

gulp.task('watch', async function () {
    gulp.watch('./source/**/*.less', gulp.series('less'));
    gulp.watch('./source/**/*.js', gulp.series('scripts'));
});


gulp.task('default', gulp.series('less', 'scripts', 'bundle', 'build', 'watch', 'browser-sync'));
