/*
 * @Author: Roy
 * @Date: 2022-08-29 13:15:05
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-29 16:46:56
 * @Description: 请填写简介
 */

var { Buffer } = require('buffer');

// lib/util.js
const NORMAL = 'normal';
const url = 'url';

function base64Encode(string, alphabet = NORMAL) {
  let buf;

  if (string === null || typeof string === 'undefined') {
    return string;
  }

  if (typeof Buffer.from === 'function' && Buffer.from !== Uint8Array.from) {
    buf = Buffer.from(string);
  } else {
    buf = new Buffer(string);
  }
  if (alphabet === url) {
    const m = {
      '+': '-',
      '/': '_'
    };

    return buf.toString('base64').replace(/[+/]|=+$/g, (char) => m[char] || '');
  }

  return buf.toString('base64');
}

function base64DecodeToBuffer(string) {
  if (string === null || typeof string === 'undefined') {
    return string;
  }

  if (typeof Buffer.from === 'function' && Buffer.from !== Uint8Array.from) {
    return Buffer.from(string, 'base64');
  } else {
    return new Buffer(string, 'base64');
  }
}

function base64Decode(string) {
  return !string ? string : base64DecodeToBuffer(string.replace(/[-_]/g, (char) => (char === '-' ? '+' : '/'))).toString();
}

module.exports = { base64Encode, base64DecodeToBuffer, base64Decode };
