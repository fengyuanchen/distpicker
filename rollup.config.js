const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const pkg = require('./package');

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

module.exports = {
  input: 'src/index.js',
  output: [
    {
      banner,
      file: 'dist/distpicker.js',
      format: 'umd',
      name: 'Distpicker',
      globals: {
        jquery: 'jQuery',
      },
    },
    {
      banner,
      file: 'dist/distpicker.common.js',
      format: 'cjs',
      globals: {
        jquery: 'jQuery',
      },
    },
    {
      banner,
      file: 'dist/distpicker.esm.js',
      format: 'es',
      globals: {
        jquery: 'jQuery',
      },
    },
    {
      banner,
      file: 'docs/js/distpicker.js',
      format: 'umd',
      name: 'Distpicker',
      globals: {
        jquery: 'jQuery',
      },
    },
  ],
  external: ['jquery'],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
