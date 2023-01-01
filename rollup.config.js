const babel = require('@rollup/plugin-babel');
const changeCase = require('change-case');
const commonjs = require('@rollup/plugin-commonjs');
const createBanner = require('create-banner');
const nodeResolve = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser');
const pkg = require('./package.json');

const name = changeCase.pascalCase(pkg.name);
const banner = createBanner({
  case: 'PascalCase',
  data: {
    year: '2014-present',
  },
  template: 'inline',
});
const globals = {
  jquery: 'jQuery',
};

module.exports = {
  input: 'src/index.js',
  output: [
    {
      banner,
      name,
      globals,
      file: pkg.browser,
      format: 'umd',
    },
    {
      banner,
      name,
      file: pkg.browser.replace(/(\.js)$/, '.min$1'),
      globals,
      format: 'umd',
      compact: true,
      plugins: [
        terser(),
      ],
    },
    {
      banner,
      file: pkg.main,
      format: 'cjs',
      exports: 'auto',
    },
    {
      banner,
      file: pkg.module,
      format: 'esm',
    },
    {
      banner,
      name,
      globals,
      file: pkg.browser.replace(/^dist/, 'docs/js'),
      format: 'umd',
    },
  ],
  external: ['jquery'],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
    }),
  ],
};
