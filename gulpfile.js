var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var gls = require('gulp-live-server');
var _scssFiles = 'src/_scss/**/*.scss';
var _tsFiles = 'src/_ts/**/*.ts';
var tsProject = ts.createProject('tsconfig.json');

gulp.task('sass', function() {
    return gulp.src(_scssFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'));
});

gulp.task('typescript', function() {
    return gulp.src(_tsFiles )
        .pipe(ts(tsProject))
        .pipe(gulp.dest('src/js'));
});

//Watch task
gulp.task('watch', function() {
    gulp.watch(_scssFiles, ['sass']);
	gulp.watch(_tsFiles, ['typescript']);
});


gulp.task('serve', function() {
  var server = gls.static(['src']);
  server.start();
 
  //use gulp.watch to trigger server actions(notify, start or stop) 
  gulp.watch(['src/**/*.css', 'src/**/*.js', 'src/**/*.html'], function (file) {
    server.notify.apply(server, [file]);
  });
});

gulp.task('default', ['sass', 'typescript', 'watch', 'serve']);