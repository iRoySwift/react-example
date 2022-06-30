import { postData } from '@/utils/fetch';
import React, { useCallback, useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import Socket, { EVENT_CONNECTED, EVENT_CONNECTING, EVENT_DISCONNECTED, EVENT_MESSAGE } from './Socket';

interface Props {
  dragOffset: number;
}
const Shell: React.FC<Props> = ({ dragOffset }) => {
  const xtermRef = useRef<HTMLDivElement | null>(null);
  let terminal: Terminal | null = null;
  let socket: Socket | null = null;
  let fitAddon: FitAddon;

  let xtermConfig = {
    cursorBlink: true,
    useStyle: true,
    fontSize: 12
  };
  const socketURL = 'ws://127.0.0.1:4000/socket/';
  // 获取pid
  const initSysEnv = useCallback(
    async () =>
      await postData('http://127.0.0.1:4000/terminal')
        .then((data) => data)
        .catch((err) => {
          throw new Error(err);
        }),
    []
  );
  // 实例化 xterm
  const setupTerminal = useCallback(async () => {
    if (terminal) return;
    if (!xtermRef.current) return;
    terminal = new Terminal({
      theme: {
        background: '#fff',
        cursor: '#DAC342',
        selection: 'rgba(61, 152, 211, .5)',
        foreground: '#141419'
      },
      ...xtermConfig
    });

    fitAddon = new FitAddon();
    // const searchAddon = new SearchAddon();
    terminal.loadAddon(fitAddon);

    // terminal.loadAddon(searchAddon);
    terminal.loadAddon(new WebLinksAddon());
    terminal.open(xtermRef.current);
    fit();
    terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');

    terminal.onData((input) => {
      // const msg = `0${base64Encode(input)}`;
      write(input);
    });
  }, [xtermRef]);

  const clear = () => {
    terminal?.clear();
  };

  const write = (msg) => {
    socket?.send(msg);
  };
  // 连接websocket
  const connect = useCallback(async () => {
    if (socket) {
      await socket.disconnect();
      socket = null;
      terminal!.reset();
    }
    const pid = await initSysEnv();
    socket = new Socket(socketURL + pid);
    socket.addEventListener(EVENT_CONNECTING, () => {
      console.log('connecting');
    });
    socket.addEventListener(EVENT_CONNECTED, () => {
      console.log('connected');
    });
    socket.addEventListener(EVENT_DISCONNECTED, () => {
      console.log('disconnected');
    });
    socket.addEventListener(EVENT_MESSAGE, (event: any) => {
      terminal?.write(event.detail.data.toString());
    });

    socket.connect();
    terminal!.focus();
  }, []);

  const cleanup = () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
    if (terminal) {
      clear();
      terminal.dispose();
      terminal = null;
    }
  };
  const fit = useCallback(() => {
    if (!fitAddon) {
      return;
    }
    fitAddon.fit();
    // const { rows, cols } = fitAddon.proposeDimensions();

    // const message = JSON.stringify({
    //   Width: Math.floor(cols),
    //   Height: Math.floor(rows)
    // });

    // socket?.send(message);
  }, []);

  useEffect(() => {
    setupTerminal();
    connect();
    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    fit();
  }, [dragOffset]);
  return <div ref={xtermRef}></div>;
};
export default Shell;
