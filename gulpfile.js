const gulp = require('gulp');
const webpack = require('webpack-stream');
const plugins = require('gulp-load-plugins')();
const pkg = require('./package');

const scripts = {
  docs: 'docs/js',
  dest: 'dist',
  entry: 'src/main.js',
  output: 'dist/distpicker.js',
  src: 'src/*.js',
};
const now = new Date();
const banner = `/*!
 * Distpicker v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) 2014-${now.getFullYear()} ${pkg.author.name}
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */

`;

gulp.task('eslint', () => {
  return gulp.src(scripts.src)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});

gulp.task('webpack', () => {
  return gulp.src(scripts.entry)
    .pipe(webpack({
      output: {
        filename: 'distpicker.js',
      },
      externals: {
        jquery: 'window.jQuery',
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            query: {
              presets: ['es2015'],
            },
          },
        ],
      },
      devtool: 'source-map',
    }))
    .pipe(gulp.dest(scripts.dest));
});

gulp.task('js', ['eslint', 'webpack'], () => {
  return gulp.src(scripts.output)
    .pipe(plugins.banner(banner))
    .pipe(gulp.dest(scripts.docs))
    .pipe(gulp.dest(scripts.dest))
    .pipe(plugins.uglify())
    .pipe(plugins.banner(banner))
    .pipe(plugins.rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(scripts.dest));
});

gulp.task('site', () => {
  return gulp.src('docs/**')
    .pipe(gulp.dest('site'));
});

gulp.task('release', ['js', 'site']);

gulp.task('watch', () => {
  gulp.watch(scripts.src, ['webpack']);
});

gulp.task('default', ['watch']);
