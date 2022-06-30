const express = require('express');
const expressWs = require('express-ws');
const app = express();
expressWs(app);
app.listen(4000, '127.0.0.1');
const pty = require('node-pty');
const os = require('os');
const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

app.all('*', function (req, res, next) {
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
    rows: 24,
    cwd: process.env.HOME,
    env: process.env
  });
  termMap.set(term.pid, term);
  return term;
}
//服务端初始化
app.post('/terminal', (req, res) => {
  const term = nodeEnvBind(req);
  res.send(term.pid.toString());
  res.end();
});
app.ws('/socket/:pid', (ws, req) => {
  const pid = parseInt(req.params.pid);
  const term = termMap.get(pid);
  term.on('data', function (data) {
    console.log(data, pid, 'data');
    ws.send(data);
  });
  ws.on('message', (data) => {
    term.write(data);
  });
  ws.on('close', function () {
    term.kill();
    termMap.delete(pid);
  });
});
