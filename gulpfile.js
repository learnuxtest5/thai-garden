var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jasmine = require('gulp-jasmine'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    runSequence = require('run-sequence');

gulp.task('default', function () {
    runSequence('clean', 'build', 'test');
});

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('build:styles', function () {
    gulp.src('client/src/styles/main.less') // path to your file
        .pipe(less().on('error', function (err) {
            console.log(err);
        }))
        .pipe(gulp.dest('dist/server/public/styles/'));
});

gulp.task('build:scripts', function () {
    gulp.src('client/src/scripts/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/server/public/scripts/'));
});

gulp.task('build:vendor-scripts', function () {
    gulp.src(['node_modules/jquery/dist/jquery.js'])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('dist/server/public/scripts/'));
});

gulp.task('build:html', function () {
    gulp.src('client/src/html/**/*')
        .pipe(gulp.dest('dist/server/public/'));
});

gulp.task('build:img', function () {
    gulp.src('client/src/img/**/*')
        .pipe(gulp.dest('dist/server/public/img/'));
});

gulp.task('build:server', function () {
    gulp.src('server/**/*')
        .pipe(gulp.dest('dist/server'));
});

gulp.task('build', [
    'build:styles',
    'build:scripts',
    'build:vendor-scripts',
    'build:html',
    'build:server',
    'build:img']);

gulp.task('test', function () {
    gulp.src(['client/test/**/*.js', 'server/test/**/*.js'])
        .pipe(jasmine());
});