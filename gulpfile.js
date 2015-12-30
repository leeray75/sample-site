var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var gls = require('gulp-live-server');
var watch = require('gulp-watch');
var debug = require('gulp-debug');
var rimraf = require('gulp-rimraf');
var minify = require('gulp-minify');
var nano = require('gulp-cssnano');
var _scssFiles = 'src/_scss/**/*.scss';
var _tsFiles = 'src/_ts/**/*.ts';
var tsProject = ts.createProject('tsconfig.json');
var server = gls.static(['.']);

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
    watch(_scssFiles, function () {
        gulp.start("sass");
    });	
	 watch(_tsFiles, function () {
        gulp.start("typescript");
    });	
	/*
    gulp.watch(_scssFiles, ['sass']);
	gulp.watch(_tsFiles, ['typescript']);
	*/
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
});

gulp.task('minify-css', function(cb) {
    return gulp.src('./src/css/**/*.css')
        .pipe(nano())
        .pipe(gulp.dest('./build/Release/css'));
});
gulp.task('minify-js', function(cb) {
  return gulp.src('./src/js/**/*.js')
	.pipe(debug())
    .pipe(minify({
        /* exclude: ['tasks'], */
        ignoreFiles: ['.combo.js','.min.js','-min.js']
    }))
    .pipe(gulp.dest('./build/Release/js'));
});
gulp.task('copy-fonts', function(cb) {
  return gulp.src('./src/fonts/**/*')    
    .pipe(gulp.dest('./build/Release/fonts'));
});

function doWatch(){
    watch('./src/js/**/*.js', function(cb){
		
		var file = "."+arguments[0].path.replace(arguments[0].cwd,'').replace(/\\/g, "/");
		var x = file.split("/");
		var dest = file.replace("./src","./build/Release").replace("/"+x[x.length-1],"");		
		gulp.src(file)
		.pipe(debug())
		.pipe(minify({
			/* exclude: ['tasks'], */
			ignoreFiles: ['.combo.js','.min.js','-min.js']
		}))
		.pipe(gulp.dest(dest));
	});
    watch('./src/css/**/*.css', function(cb){		
		var file = "."+arguments[0].path.replace(arguments[0].cwd,'').replace(/\\/g, "/");
		var x = file.split("/");		
		var dest = file.replace("./src","./build/Release").replace("/"+x[x.length-1],"");	
		gulp.src(file)
		.pipe(debug())
		.pipe(nano())
		.pipe(gulp.dest(dest));
	});

	gulp.watch(['build/Release/js/**/*.js','build/Release/css/**/*.css','src/**/*.html'], function (file) {	
		server.notify.apply(server,[file]);
	});
	
}
gulp.task('build',['minify-css','minify-js','copy-fonts'],function(){
	doWatch();
});

gulp.task('init',['sass', 'typescript', 'watch'],function(){
	gulp.start('build');
	gulp.start("server");
});

gulp.task('server', function() {  
  server.start();
});

gulp.task('default', ['clean'],function(){
	console.log("triggering new tasks");
	gulp.start('init');
});
