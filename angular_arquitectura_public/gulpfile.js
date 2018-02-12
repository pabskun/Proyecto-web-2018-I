// Se inyecta el modo estricto de EcmaScript, que elimina los errores comunes de JS
'use strict';

// Se inyectan las dependencias dentro del archivo
const gulp = require('gulp');
const connect = require('gulp-connect');
const nodemon = require('gulp-nodemon');

// Se crea una tarea que conecta el servidor, con la ruta que va a conectar
gulp.task('connect', () => {
  connect.server({
    root:'public',
    port: 8000,
    livereload: true
  });
});

// Se crea una tarea que trae todas las dependencias desde los node_modules hasta la carpeta lib dentro de public
gulp.task('dependencies', () => {

  // Trae bootstarp desde las dependencias y lo copia dentro de public para poder ser utilizado por el front-end
  gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/bootstrap/dist/css/bootstrap.min.css'
  ])
  .pipe(gulp.dest('./public/lib/bootstrap'));

  // Trae angular, jquery y popper desde las dependencias y lo copia dentro de public para poder ser utilizado por el front-end
  gulp.src([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/popper.js/dist/popper.min.js',
    './node_modules/sweetalert/dist/sweetalert.min.js',
    './node_modules/angular/angular.min.js',
    './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
    './node_modules/angular-css/angular-css.min.js',
    './node_modules/oclazyload/dist/ocLazyLoad.min.js'
  ])
  .pipe(gulp.dest('./public/lib/'));
});

// Tarea que recarga todos los html
gulp.task('html', () => {
  gulp.src('./public/components/**/*.html')
  .pipe(connect.reload())
})

// Tarea que recarga todos los css
gulp.task('css', () => {
  gulp.src('./public/components/**/*.css')
  .pipe(connect.reload())
})

// Tarea que recarga todos los js
gulp.task('js', () => {
gulp.src('./public/components/**/*.js')
  .pipe(connect.reload())
})

// Tarea que vigila todos los cambios dentro de los archivos de html, css y js y llama a las tareas de recarga de cada uno
gulp.task('watch', () => {
  gulp.watch([
    './public/*.css',
    './public/components/*.css',
    './public/components/**/*.css',
    './public/components/**/**/*.css'
  ], ['css']);

  gulp.watch([
    './public/*.js',
    './public/components/*.js',
    './public/components/**/*.js',
    './public/components/**/**/*.js',
  ], ['js']);

  gulp.watch([
    './public/*.html',
    './public/components/*.html',
    './public/components/**/*.html',
    './public/components/**/**/*.html'
  ], ['html']);
});

// Tarea global que llama todas las tareas
gulp.task('default', ['connect','dependencies','html','css','js','watch']);