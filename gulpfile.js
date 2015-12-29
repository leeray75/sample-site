var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var gls = require('gulp-live-server');
var watch = require('gulp-watch');
var rimraf = require('gulp-rimraf');
var minify = require('gulp-minify');
var nano = require('gulp-cssnano');
var _scssFiles = 'src/_scss/**/*.scss';
var _tsFiles = 'src/_ts/**/*.ts';
var tsProject = ts.createProject('tsconfig.json');
var server;

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


gulp.task('clean-css', function(cb) {
	return gulp.src('./src/css', { read: false }) // much faster
	  .pipe(rimraf());
});
gulp.task('clean-js', function(cb) {
	return gulp.src('./src/js', { read: false }) // much faster
	  .pipe(rimraf());
});
gulp.task('clean-build', function(cb) {
	return gulp.src('./build/Release', { read: false }) // much faster
	  .pipe(rimraf());
});

gulp.task('clean',['clean-css','clean-js','clean-build'],function(){
	console.log("Done Cleaning");	
});

gulp.task('minify-css', function(cb) {
    return gulp.src('./src/css/**/*.css')
        .pipe(nano())
        .pipe(gulp.dest('./build/Release/css'));
});
gulp.task('minify-js', function(cb) {
  return gulp.src('./src/js/**/*.js')
    .pipe(minify({
        /* exclude: ['tasks'], */
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('./build/Release/js'));
});
gulp.task('copy-fonts', function(cb) {
  return gulp.src('./src/fonts/**/*')    
    .pipe(gulp.dest('./build/Release/fonts'));
});


gulp.task('build',['minify-css','minify-js','copy-fonts'],function(){
    watch('./src/js/**/*.js', function(cb){
		gulp.start('minify-js');		
	});
    watch('./src/css/**/*.css', function(cb){
		gulp.start('minify-css');		
	});		
	console.log("Done Minify");	
	gulp.start("server");
});

gulp.task('init',['sass', 'typescript', 'watch'],function(){
	gulp.start('build');
});

gulp.task('server', function() {
  server = gls.static(['.']);
  server.start();
 
  //use gulp.watch to trigger server actions(notify, start or stop) 
  gulp.watch(['build/Release/js/**/*.js','build/Release/css/**/*.css','src/**/*.html'], function (data) {	
	
	console.log("["+data.type+"] : "+data.path);
    server.notify.apply(server,[data]);
  });
});

gulp.task('default', ['clean'],function(){
	console.log("triggering new tasks");
	gulp.start('init');
});
