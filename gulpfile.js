var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

gulp.task('img', ()=>{
  gulp.src('./src/images/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('./dist/images/'))
  .pipe(browserSync.stream());
});

gulp.task('html', ()=>{
  gulp.src('./src/*.html')
  .pipe(gulp.dest('./dist/'))
  .pipe(browserSync.stream());
});

 gulp.task('sass', ()=>{
  gulp.src('./src/styles/**/*.scss')
  .pipe(sass())
  .pipe(cleanCSS())
  .pipe(gulp.dest('./dist/styles/'))
  .pipe(browserSync.stream());
});

gulp.task('css', ()=>{
  gulp.src('./src/styles/**/*.css')
  .pipe(cleanCSS())
  .pipe(gulp.dest('./dist/styles/'))
  .pipe(browserSync.stream());
});

gulp.task('js', ()=>{
  gulp.src('./src/scripts/**/*.js')
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/scripts'))
  .pipe(browserSync.stream());
});


gulp.task('serve',['html','css','js','img','sass'],()=>{

  browserSync.init({
    server: './dist/'
  });

  gulp.watch('./src/styles/*.css',['css']);
  gulp.watch('./src/styles/*.scss',['sass']);
  gulp.watch('./src/scripts/*.js',['jsCon']);
  gulp.watch('./src/images/*',['img']);
  gulp.watch('./src/*.html',['html']);
});

gulp.task('default', ['serve']);
