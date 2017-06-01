const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const pkg = require('./package');

const now = new Date();

module.exports = {
  entry: 'src/index.js',
  targets: [
    {
      dest: 'dist/distpicker.js',
    },
    {
      dest: 'dist/distpicker.common.js',
      format: 'cjs',
    },
    {
      dest: 'dist/distpicker.esm.js',
      format: 'es',
    },
    {
      dest: 'docs/js/distpicker.js',
    },
  ],
  format: 'umd',
  moduleName: 'Distpicker',
  external: ['jquery'],
  globals: {
    jquery: 'jQuery',
  },
  plugins: [
    commonjs(),
    nodeResolve({
      jsnext: true,
    }),
    babel({
      exclude: '/node_modules/**',
    }),
  ],
  banner: `/*!
 * Distpicker v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) 2014-${now.getFullYear()} ${pkg.author.name}
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */

`,
};
