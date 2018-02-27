'use strict';

const gulp = require('gulp'),
      connect = require('gulp-connect'),
      nodemon = require('gulp-nodemon'),
      todo = require('gulp-todo'),
      browserSync = require('browser-sync'),
      paths = {
        views : './public/components/**/**/*.html',
        styles : './public/components/**/**/*.css',
        js: './public/components/**/**/*.js'
      };

gulp.task('connect', () => {
  connect.server({
    root: 'public',
    port: 8000,
    livereload: true
  });
  browserSync.init({
    server: './public'
  })
});

gulp.task('to-do', () => {
  gulp.src(paths.js)
  .pipe(todo())
  .pipe(gulp.dest('./'));
});

gulp.task('dependencies', () => {
  gulp.src([
    './node_modules/angular/angular.min.js'
  ])
    .pipe(gulp.dest('./public/lib/angular'));

  gulp.src([
    './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
    './node_modules/oclazyload/dist/ocLazyLoad.min.js',
    './node_modules/ui-router-page-title/page-title.min.js'
  ])
    .pipe(gulp.dest('./public/lib/angular/routing'));

  gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/popper.js/dist/popper.min.js'
  ])
    .pipe(gulp.dest('./public/lib/bootstrap'));

  gulp.src([
    './node_modules/sweetalert/dist/sweetalert.min.js',
  ])
    .pipe(gulp.dest('./public/lib/sweetalert'));

});

gulp.task('reload', () => {
  gulp.src([paths.views, paths.styles, paths.js])
    .pipe(connect.reload())
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  gulp.watch([paths.views, paths.styles,paths.js], ['reload', 'to-do'])
    .on('change', browserSync.reload);
});

gulp.task('default', ['connect', 'to-do', 'dependencies', 'reload', 'watch']);