var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat-util');

// compile and minify global sass files into 1 css file
gulp.task('sass', function() {
  return gulp.src('public/stylesheets/sass/**/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(concat('global.css'))
      .pipe(gulp.dest('public/stylesheets/css'));
});

// compile and minify external libraries
gulp.task('jsLib', function () {
  gulp.src('public/lib/**/*.js')
      .pipe(concat.scripts('wm-libs.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/lib'));
});

// Global Variables / Functions
gulp.task('jsGlobal', function () {
  gulp.src('public/js/global/**/*.js')
      .pipe(concat('wm-global.js'))
      //.pipe(uglify())
      .pipe(gulp.dest('public/js'));
});

// compile and minify filters
gulp.task('filters', function() {
  gulp.src('public/js/filters/*.js')
      .pipe(concat.scripts('wm-filters.js'))
      // .pipe(uglify())
      .pipe(gulp.dest('public/js'));
});

// compile and minify services
gulp.task('services', function() {
  gulp.src('public/js/services/*.js')
      .pipe(concat.scripts('wm-services.js'))
      // .pipe(uglify())
      .pipe(gulp.dest('public/js'));
});

// compile and minify controllers
gulp.task('controllers', function() {
  gulp.src('public/js/controllers/**/*.js')
      .pipe(concat.scripts('wm-controllers.js'))
      // .pipe(uglify())
      .pipe(gulp.dest('public/js'));
});

// compile and minify directives
gulp.task('directives', function() {
  gulp.src('public/js/directives/*.js')
      .pipe(concat.scripts('wm-directives.js'))
      // .pipe(uglify())
      .pipe(gulp.dest('public/js'));
});

// minify size of images
// gulp.task('imageMin', function() {
//   gulp.src('src')
//     .pipe(imagemin())
//     .pipe(gulp.dest('/dest'));
// });

// default tasks to be run when typing gulp
gulp.task('default', ['jsGlobal', 'sass', 'filters', 'services', 'directives', 'controllers', 'jsLib']);

// watch all these tasks
gulp.task('watch', function() {
  gulp.watch('public/js/global/**/*.js', ['jsGlobal']);
  gulp.watch('public/js/services/*.js', ['services']);
  gulp.watch('public/js/controllers/**/*.js', ['controllers']);
  gulp.watch('public/js/directives/*.js', ['directives']);
  gulp.watch('public/js/filters/*.js', ['filters']);
  gulp.watch('public/stylesheets/sass/**/*.scss', ['sass']);
  //gulp.watch('/src', ['imageMin']);
});
