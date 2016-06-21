var gulp = require('gulp'), less = require('gulp-less'),
    rename = require('gulp-rename'),
    gp_concat = require('gulp-concat'),
    gp_uglify = require('gulp-uglify'),
    del = require('del'),
    jasmine = require('gulp-jasmine');

gulp.task('default', ['clean', 'build', 'test']);

gulp.task('clean', function () {
    return del(['dist']);
    
});

gulp.task('build:styles', function () {


    gulp.src('client/src/styles/main.less') // path to your file
        .pipe(less().on('error', function (err) {
            console.log(err);
        }))
        .pipe(gulp.dest('dist/styles/'));

});

gulp.task('build:scripts', function () {


    gulp.src('client/src/scripts/**/*.js')
        .pipe(gp_concat('main.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('dist/scripts/'));


});

gulp.task('build:html', function () {
    gulp.src('client/src/html/index.html')
    // Perform minification tasks, etc here
        .pipe(gulp.dest('dist/public'));
});

gulp.task('build', ['build:styles', 'build:scripts', 'build:html']);

gulp.task('test', function () {
    gulp.src(['client/test/**/*.js','server/test/**/*.js' ]).pipe(jasmine());
});