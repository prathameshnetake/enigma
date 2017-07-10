const gulp = require('gulp');
const sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', function () {
  return gulp.src('./prod/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('prod/css'));
});

gulp.task('css', function() {
  return gulp.src('./prod/css/*.css')
    .pipe(concat('combine-style.css'))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./prod/**/*.scss', ['sass', 'css']);
});