// import { base64Decode } from './utils';
const utils = require('./utils');

/*
 * @Author: Roy
 * @Date: 2022-06-16 09:54:17
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-29 14:46:32
 * @Description: websocket
 */
const express = require('express');
const expressWs = require('express-ws');
const app = express();
expressWs(app);
app.listen(4000, '127.0.0.1');
const pty = require('node-pty');
const os = require('os');
const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

app.all('*', function (_, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

const termMap = new Map(); //存储 pty 实例，通过 pid 映射
function nodeEnvBind() {
  //绑定当前系统 node 环境
  const term = pty.spawn(shell, ['--login'], {
    name: 'xterm-color',
    cols: 80,
    rows: 240,
    cwd: process.env.HOME,
    env: process.env
  });
  termMap.set(term.pid, term);
  return term;
}
//服务端初始化
app.post('/terminal', (_, res) => {
  const term = nodeEnvBind();
  res.send(term.pid.toString());
  res.end();
});
app.ws('/socket/:pid', (ws, req) => {
  const pid = parseInt(req.params.pid);
  const term = termMap.get(pid);
  term.on('data', function (data) {
    console.log('1', data, '--data--');
    const message = `1${utils.base64Encode(data)}`;

    ws.send(message);
  });
  ws.on('message', (data) => {
    const type = data.substr(0, 1);
    const msg = utils.base64Decode(data.substr(1));

    console.log('2', data, msg, '--message--');
    if (`${type}` === '4') {
      const obj = JSON.parse(msg);
      term.resize(obj.Width, obj.Height);
    }
    if (`${type}` === '0') {
      term.write(msg);
    }
  });
  ws.on('close', function () {
    term.kill();
    termMap.delete(pid);
  });
});
