var gulp = require('gulp'), less = require('gulp-less'),
    rename = require('gulp-rename'),
    gp_concat = require('gulp-concat'),
    gp_uglify = require('gulp-uglify'),
    del = require('del'),
    jasmine = require('gulp-jasmine');

gulp.task('default', [ 'build', 'test']);

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


    gulp.src([ 'client/src/scripts/restaurants.js', 'client/src/scripts/main.js'])
        .pipe(gp_concat('main.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('dist/server/public/scripts/'));


});

gulp.task('build:html', function () {
    gulp.src('client/src/html/index.html')
    // Perform minification tasks, etc here
        .pipe(gulp.dest('dist/server/public/'));
});


gulp.task('build:server', function () {
    gulp.src('server/**/*')
        .pipe(gulp.dest('dist/server'));
});

gulp.task('build', ['build:styles', 'build:scripts', 'build:html', 'build:server']);

gulp.task('test', function () {
    gulp.src(['client/test/**/*.js','server/test/**/*.js' ]).pipe(jasmine());
});