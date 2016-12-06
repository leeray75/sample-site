var gulp = require('gulp');
var gulpif = require('gulp-if');
var map  = require('map-stream');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var gls = require('gulp-live-server');
var watch = require('gulp-watch');
var rename = require("gulp-rename");
var debug = require('gulp-debug');
var rimraf = require('gulp-rimraf');
var minify = require('gulp-minify');
var nano = require('gulp-cssnano');

var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


var htmlmin = require('gulp-html-minifier');
var _scssFiles = 'src/_scss/**/*.scss';
var _tsFiles = 'src/_ts/**/*.ts';
var tsProject = ts.createProject('tsconfig.json');
var server = gls.static(['.']);
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}
var renameMinJsFile = function(path){
	if(path.basename.endsWith("-min")){			
		path.basename = path.basename.replace(/-min([^-min]*)$/,'$1');
		path.extname = ".min.js";
	}		
}
gulp.task('sass', function() {
    return gulp.src(_scssFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/dev/css'));
});

gulp.task('typescript', function() {
	console.log("task: typescript");
    return gulp.src(_tsFiles )
        .pipe(ts(tsProject))
        .pipe(gulp.dest('build/dev/js'));

});



//Watch task
gulp.task('watch', function() {
	console.log("watching _scss and _ts files");
    watch(_scssFiles, function () {
        gulp.start("sass");
    });	
	 watch(_tsFiles, function () {		 
        gulp.start("typescript");
    });	

	watch('src/templates/**/*',function(){
		gulp.start('copy-templates');
	})
	/*
    gulp.watch(_scssFiles, ['sass']);
	gulp.watch(_tsFiles, ['typescript']);
	*/
});


(function(){
	var jsFiles = './build/dev/js/**/*',  
    jsDest = './build/Release/js';
	
	gulp.task('concat-scripts', function() {  
		console.log("running concat-scripts");
		return gulp.src(jsFiles)
			.pipe(concat('scripts-combo.js'))
			.pipe(gulp.dest(jsDest));
	});
})();

gulp.task('clean-css', function(cb) {
	return gulp.src('./src/css', { read: false }) // much faster
	  .pipe(rimraf());
});
gulp.task('clean-js', function(cb) {
	return gulp.src('./src/js', { read: false }) // much faster
	  .pipe(rimraf());
});
gulp.task('clean-build', function(cb) {
	return gulp.src('./build/*', { read: false }) // much faster
	  .pipe(rimraf());
});
/*
gulp.task('clean',['clean-css','clean-js','clean-build'],function(){	
});
*/
gulp.task('clean',['clean-build'],function(){	
});
gulp.task('minify-css', function(cb) {
    return gulp.src('./build/dev/css/**/*.css')
        .pipe(nano())
        .pipe(gulp.dest('./build/Release/css'));
});
gulp.task('minify-js', function(cb) {
	console.log("minify-js");
  return gulp.src('./build/dev/js/**/*.js')
	.pipe(debug())
    .pipe(minify({
        /* exclude: ['tasks'], */
        ignoreFiles: ['.combo.js','.min.js','-min.js']
    }))
	.pipe(rename(renameMinJsFile))
	.pipe(debug())
    .pipe(gulp.dest('./build/Release/js'));
});

gulp.task('copy-fonts', function(cb) {
	console.log("copy fonts");
  return gulp.src('./src/fonts/**/*')
	.pipe(gulp.dest('./build/dev/fonts'))
    .pipe(gulp.dest('./build/Release/fonts'));
});

gulp.task('copy-templates', function(cb) {
	console.log("copy templates");
  return gulp.src('./src/templates/**/*')
	.pipe(gulp.dest('./build/dev/templates'))
    .pipe(gulp.dest('./build/Release/templates'));
});
gulp.task('copy-images', function(cb) {
	console.log("copy images");
  return gulp.src('./src/images/**/*')
	.pipe(gulp.dest('./build/dev/images'))
    .pipe(gulp.dest('./build/Release/images'));
});
gulp.task('copy-js', function(cb) {
	console.log("copy javascripts");
  return gulp.src('./src/js/**/*')
	.pipe(gulp.dest('./build/dev/js'))
    .pipe(gulp.dest('./build/Release/js'));
});
gulp.task('copy-css', function(cb) {
	console.log("copy css");
  return gulp.src('./src/css/**/*')
	.pipe(gulp.dest('./build/dev/css'))
    .pipe(gulp.dest('./build/Release/css'));
});

function doWatch(){
    watch('./build/dev/js/**/*.js', function(cb){
		
		var file = "."+arguments[0].path.replace(arguments[0].cwd,'').replace(/\\/g, "/");
		var scriptsPath = file.substring(0, file.lastIndexOf("/"));
		var dest = scriptsPath.replace("./build/dev","./build/Release");	
		
		gulp.src(file)		
		.pipe(minify({
			/* exclude: ['tasks'], */
			ignoreFiles: ['.combo.js','.min.js','-min.js']
		}))
		.pipe(rename(renameMinJsFile))
		.pipe(gulp.dest(dest));
	});
	/* 
    watch(['./build/dev/js/ng2-apps/**//*.js','!./build/dev/js/ng2-apps/**//*.combo.js'], function(cb){
		var file = "."+arguments[0].path.replace(arguments[0].cwd,'').replace(/\\/g, "/");
		var scriptsPath = file.substring(0, file.lastIndexOf("/"));
		var dest = scriptsPath.replace("./build/dev","./build/Release");	
		var pathsArray = scriptsPath.split("/");
		var folderName = pathsArray[pathsArray.length-1];
		console.log("scriptsPath:",scriptsPath);
		console.log("folderName:",folderName);
		
		gulp.src([scriptsPath+'/**//*.js','!'+scriptsPath+'/**//*.combo.js'])
        .pipe(concat(folderName + '.combo.js'))
		.pipe(debug())
        .pipe(gulp.dest(scriptsPath));
	});	
	*/

    watch('./build/dev/css/**/*.css', function(cb){
		console.log("watch css");
		var file = "."+arguments[0].path.replace(arguments[0].cwd,'').replace(/\\/g, "/");
		var filePath = file.substring(0, file.lastIndexOf("/"));
		var dest = filePath.replace("./build/dev","./build/Release");
		gulp.src(file)
		.pipe(debug())
		.pipe(nano())
		.pipe(gulp.dest(dest));
	});

	gulp.watch(['build/Release/js/**/*.js','build/Release/css/**/*.css','build/Release/templates/**/*.html','src/_html/**/*.html'], function (file) {	
		server.notify.apply(server,[file]);
	});
	
}
gulp.task('build',['minify-css','minify-js','concat-scripts','copy-fonts','copy-templates','copy-images'],function(){
	console.log("finished build, doing watch");
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
