import babel from '@rollup/plugin-babel';
import changeCase from 'change-case';
import commonjs from '@rollup/plugin-commonjs';
import createBanner from 'create-banner';
import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

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

export default {
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
