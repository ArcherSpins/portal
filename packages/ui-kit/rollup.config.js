
import babel from 'rollup-plugin-babel';
import flow from 'rollup-plugin-flow';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import { uglify } from 'rollup-plugin-uglify';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

import pkg from './package.json';

const nanoid = require('nanoid');
const path = require('path');

const sassModuleRegex = /\.module\.(scss|sass)$/;


const hash = nanoid(5);

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      minimize: true,
    },
  ],
  plugins: [
    external(),
    babel(),
    postcss({
      modules: {
        generateScopedName(name, filename) {
          const isCssModule = sassModuleRegex.test(filename);
          if (isCssModule) {
            const file = path.basename(filename, '.module.scss');
            return `${file}_${name}__${hash}`;
          }

          return name;
        },
      },
      extract: false,
      minimize: true,
      autoModules: true,
    }),
    url(),
    svgr(),
    resolve(),
    flow(),
    commonjs({
      include: /node_modules/,
    }),
    uglify(),
    sizeSnapshot(),
  ],
};
