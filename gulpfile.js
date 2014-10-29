'use strict';

var browserify = require('browserify');
var browserSync = require('browser-sync');
var es6ify = require('es6ify');
var gulp = require('gulp');
var reload = browserSync.reload;
var runSequence = require('run-sequence');
var source = require('vinyl-source-stream');
var $ = require('gulp-load-plugins')();

es6ify.traceurOverrides = {blockBinding : true};

var path = {
  webComponents: {
    src: 'app/src/web-components/*.html',
    build: 'app/build/web-components'
  },
  images: {
    src: 'app/src/images/*',
    build: 'app/build/images'
  },
  index: {
    src: 'app/src/index.html',
    build: 'app/build/'
  },
  js: {
    src: 'app/src/js/*.js',
    build: 'app/build/js'
  }
};

var tasks = [
  'jshint',
  'compile',
  'index',
  'web-components',
  'vulcanize',
  'images',
  'browser-sync'
];

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    notify: false,
    proxy: 'http://localhost:1337',
    port: 3000
  });
});

gulp.task('compile', function () {
  return browserify()
    .add(es6ify.runtime)
    .require(require.resolve('app/src/js/livepal.js'), {entry: true, debug: false})
    .transform(es6ify)
    .bundle()
    .pipe(source('livepal.js'))
    .pipe($.streamify($.sourcemaps.init()))
    .pipe($.streamify($.uglify({mangle: false})))
    .pipe($.streamify($.sourcemaps.write()))
    .pipe(gulp.dest(path.js.build));
});

gulp.task('index', function () {
  return gulp.src(path.index.src)
    .pipe(gulp.dest(path.index.build));
});

gulp.task('images', function () {
  return gulp.src(path.images.src)
    .pipe($.imagemin())
    .pipe(gulp.dest(path.images.build));
});

gulp.task('jshint', function () {
  return gulp.src(path.js.src)
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('nodemon', function (cb) {
  return $.nodemon({script: 'server/index.js'})
    .on('start', cb);
});

gulp.task('vulcanize', function () {
  return gulp.src('app/build/index.html')
    .pipe($.vulcanize({dest: 'app/build', strip: true}))
    .pipe(gulp.dest('app/build'));
});

gulp.task('web-components', function () {
  return gulp.src(path.webComponents.src)
    .pipe(gulp.dest(path.webComponents.build));
});

gulp.task('default', function () {
  runSequence(tasks);
  gulp.watch(path.webComponents.src, ['web-components', reload]);
  gulp.watch(path.index.src, ['index', reload]);
  gulp.watch(path.js.src, ['compile', reload]);
  gulp.watch(path.images.src, ['images', reload]);
});
