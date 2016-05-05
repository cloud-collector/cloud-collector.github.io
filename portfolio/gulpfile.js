var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

gulp.task('sass', function(){
  gulp.src(['./normalize.scss',
            './base.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('sass-watch', ['sass'], function(){
  var watcher = gulp.watch('./*.scss', ['sass']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('default', ['sass-watch']);
