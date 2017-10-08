const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const pkg = require('./package');

const now = new Date();

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/distpicker.js',
      format: 'umd',
    },
    {
      file: 'dist/distpicker.common.js',
      format: 'cjs',
    },
    {
      file: 'dist/distpicker.esm.js',
      format: 'es',
    },
    {
      file: 'docs/js/distpicker.js',
      format: 'umd',
    },
  ],
  name: 'Distpicker',
  external: ['jquery'],
  globals: {
    jquery: 'jQuery',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
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
