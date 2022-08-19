/*
 * @Author: Roy
 * @Date: 2022-04-13 18:05:34
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-17 18:02:13
 * @Description: 请填写简介
 */
const path = require('path');
const resolve = (_path) => path.resolve(__dirname, _path);
const DOMGlobals = ['window', 'document'];
const NodeGlobals = ['module', 'require'];

module.exports = {
  globals: {
    $: true,
    _: true,
    this: true
  },
  env: {
    browser: true,
    es6: true
  },
  parser: '@typescript-eslint/parser', // 配置ts解析器
  parserOptions: {
    project: resolve('./tsconfig.json'),
    tsconfigRootDir: resolve('./'),
    sourceType: 'module'
  },
  rules: {
    indent: 0,
    'no-unused-vars': 'off',
    'no-restricted-globals': ['error', ...DOMGlobals, ...NodeGlobals],
    'no-console': 'off'
  }
};
