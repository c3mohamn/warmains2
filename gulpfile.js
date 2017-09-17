var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat-util');

// compile and minify sass from src to dest
gulp.task('sass', function() {
  return gulp.src('public/stylesheets/sass/global/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(concat('global.css'))
      .pipe(gulp.dest('public/stylesheets/css'));
});

// compile and minify controllers
gulp.task('controllers', function() {
  gulp.src('public/js/controllers/*.js')
      .pipe(concat.scripts('wm-controllers.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/js'));
});

// compile and minify directives
gulp.task('directives', function() {
  gulp.src('public/js/directives/*.js')
      .pipe(concat.scripts('wm-directives.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/js'));
});

// minify size of images
// gulp.task('imageMin', function() {
//   gulp.src('src')
//     .pipe(imagemin())
//     .pipe(gulp.dest('/dest'));
// });

// default tasks to be run when typing gulp
gulp.task('default', ['sass', 'controllers', 'directives']);

// watch all these tasks
gulp.task('watch', function() {
  gulp.watch('public/js/controllers/*.js', ['controllers']);
  gulp.watch('public/js/directives/*.js', ['directives']);
  gulp.watch('public/stylesheets/sass/global/*.scss', ['sass']);
  //gulp.watch('/src', ['imageMin']);
});
