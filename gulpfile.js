'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var pkg = require('./package');
var now = new Date();
var scripts = {
  all: [
    'src/*.js',
    'gulpfile.js',
    'docs/js/main.js'
  ],
  src: 'src/*.js',
  docs: 'docs/js',
  dest: 'dist'
};

gulp.task('jshint', function () {
  return gulp.src(scripts.all)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

gulp.task('jscs', function () {
  return gulp.src(scripts.all)
    .pipe(plugins.jscs());
});

gulp.task('js', ['jshint', 'jscs'], function () {
  return gulp.src(scripts.src)
    .pipe(plugins.replace(/@\w+/g, function (placeholder) {
      switch (placeholder) {
        case '@VERSION':
          placeholder = pkg.version;
          break;

        case '@YEAR':
          placeholder = now.getFullYear();
          break;

        case '@DATE':
          placeholder = now.toISOString();
          break;
      }

      return placeholder;
    }))
    .pipe(gulp.dest(scripts.docs))
    .pipe(gulp.dest(scripts.dest))
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(plugins.uglify({
      preserveComments: 'license'
    }))
    .pipe(gulp.dest(scripts.dest));
});

gulp.task('jscopy', function () {
  return gulp.src(scripts.src)
    .pipe(gulp.dest(scripts.docs))
    .pipe(gulp.dest(scripts.dest));
});

gulp.task('docs', ['js'], function () {
  return gulp.src('docs/**')
    .pipe(gulp.dest('_gh_pages'));
});

gulp.task('release', ['docs'], function () {
  return gulp.src('dist/*')
    .pipe(gulp.dest('_releases/' + pkg.version));
});

gulp.task('watch', function () {
  gulp.watch(scripts.src, ['jscopy']);
});

gulp.task('default', ['watch']);
