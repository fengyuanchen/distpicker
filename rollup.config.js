const babel = require('rollup-plugin-babel');
const changeCase = require('change-case');
const commonjs = require('rollup-plugin-commonjs');
const createBanner = require('create-banner');
const nodeResolve = require('rollup-plugin-node-resolve');
const pkg = require('./package');

const name = changeCase.pascalCase(pkg.name);
const banner = createBanner({
  case: 'PascalCase',
  data: {
    year: '2014-present',
  },
});

module.exports = {
  input: 'src/index.js',
  output: [
    {
      banner,
      name,
      file: `dist/${pkg.name}.js`,
      format: 'umd',
      globals: {
        jquery: 'jQuery',
      },
    },
    {
      banner,
      file: `dist/${pkg.name}.common.js`,
      format: 'cjs',
    },
    {
      banner,
      file: `dist/${pkg.name}.esm.js`,
      format: 'esm',
    },
    {
      banner,
      name,
      file: `docs/js/${pkg.name}.js`,
      format: 'umd',
      globals: {
        jquery: 'jQuery',
      },
    },
  ],
  external: ['jquery'],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel(),
  ],
};
