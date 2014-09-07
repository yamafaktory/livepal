'use strict';

var browserify  = require('browserify');
var browserSync = require('browser-sync');
var es6ify      = require('es6ify');
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var source      = require('vinyl-source-stream');

es6ify.traceurOverrides = {blockBinding : true};

var path = {
  css: {
    src: 'app/src/css/*.css',
    build: 'app/build/css'
  },
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
  'lint',
  'compile',
  'index', // => will launch webComponents then vulcanize
  'images',
  'myth'  
];

gulp.task('browser-sync', ['nodemon'], function() {
  return browserSync({
    proxy: {
      host: 'http://localhost',
      port: '1337'
    },
    notify: false,
    open: false
  });
});

gulp.task('compile', function () {
  return browserify({debug: true})
    .add(es6ify.runtime)
    .transform(es6ify)
    .require(require.resolve('app/src/js/livepal.js'), {entry: true})
    .bundle()
    .pipe(source('livepal.js'))
    .pipe($.streamify($.uglify({mangle: false})))
    .pipe(gulp.dest(path.js.build))
    .pipe(browserSync.reload({stream: true, once: true}));
});

gulp.task('index', ['webComponents'], function () {
  return gulp.src(path.index.src)
    .pipe(gulp.dest(path.index.build));
});

gulp.task('images', function () {
  return gulp.src(path.images.src)
    .pipe($.imagemin())
    .pipe(gulp.dest(path.images.build))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('lint', function () {
  return gulp.src(path.js.src)
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('myth', function () {
  return gulp.src(path.css.src)
    .pipe($.myth())
    .pipe(gulp.dest(path.css.build))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('nodemon', function () {
  $.nodemon({script: 'server/index.js'})
    .on('start', tasks)
    .on('change', tasks);
});

gulp.task('vulcanize', function () {
  return gulp.src('app/build/index.html')
    .pipe($.vulcanize({dest: 'app/build', strip: true}))
    .pipe(gulp.dest('app/build'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
  gulp.watch(path.css.src, ['myth']);
  gulp.watch(path.html.src, ['html']);
  gulp.watch(path.js.src, ['compile']);
});

gulp.task('webComponents', ['vulcanize'], function () {
  return gulp.src(path.webComponents.src)
    .pipe(gulp.dest(path.webComponents.build));
});

gulp.task('default', ['browser-sync']);
