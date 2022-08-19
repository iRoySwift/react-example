/*
 * @Author: Roy
 * @Date: 2022-04-13 18:05:34
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-12 11:28:31
 * @Description: rollup
 */
const path = require('path');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const pkg = require('./package.json');
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';

const extensions = ['.js', '.ts', '.tsx', '.d.ts'];

const resolve = function (...args) {
  return path.resolve(__dirname, ...args);
};

// ts
const tsPlugin = typescript({
  tsconfig: resolve('./tsconfig.json'), // 本地ts配置
  extensions
});

module.exports = {
  input: resolve('./src/index.ts'),
  output: {
    dir: 'lib',
    format: 'esm',
    entryFileNames: '[name].esm.js'
  },
  plugins: [
    postcss({
      extract: true,
      // Or with custom file name
      extract: path.resolve('lib/graphin.css')
    }),
    tsPlugin,
    nodeResolve({
      browser: true,
      extensions,
      modulesOnly: true
    }),
    babel({
      exclude: 'node_modules/**',
      extensions
    }),
    ['@babel/plugin-proposal-decorators', { legacy: true }]
    // copy({
    //   targets: [{ src: 'typings', dest: 'lib' }]
    // })
  ]
};
