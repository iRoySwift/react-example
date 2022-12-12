import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { WebglAddon } from 'xterm-addon-webgl';
import { SearchAddon } from 'xterm-addon-search';
import Socket, { EVENT_CONNECTED, EVENT_CONNECTING, EVENT_CONNECT_ERROR, EVENT_DISCONNECTED, EVENT_MESSAGE } from './Socket';
import { base64Decode, base64Encode } from './utils';

interface Props {
  termHeight: number;
  tab: any;
}
let xtermConfig = {
  cursorBlink: true,
  useStyle: true,
  fontSize: 12
};
const Shell: React.FC<Props> = ({ tab, termHeight }) => {
  const xtermRef = useRef<HTMLDivElement | null>(null);
  let terminal = useRef<Terminal | null>(null);
  let fitAddon = useRef<FitAddon | null>(null);
  let webglAddon = useRef<WebglAddon | null>(null);
  let socket = useRef<Socket | null>(null);
  let keepAliveTimer = useRef<any>(null);

  let [isOpen, setIsOpen] = useState(false);

  const socketURL = 'ws://127.0.0.1:4000/socket/';

  const write = useCallback(
    (msg) => {
      if (isOpen) {
        socket.current?.send(msg);
      }
    },
    [isOpen]
  );

  const fit = useCallback(() => {
    if (!fitAddon.current) return;
    try {
      fitAddon.current?.fit();
    } catch (error) {
      console.log(error);
    }

    if (!isOpen) return;

    const { rows, cols } = fitAddon.current.proposeDimensions();
    const message = `4${base64Encode(
      JSON.stringify({
        Width: Math.floor(cols),
        Height: Math.floor(rows)
      })
    )}`;

    socket.current?.send(message);
  }, [isOpen]);

  const cleanup = useCallback(() => {
    if (socket.current) {
      socket.current?.disconnect();
      socket.current = null;
    }
    if (terminal.current) {
      terminal.current?.dispose();
      terminal.current = null;
    }
  }, []);
  // 实例化 xterm
  const setupTerminal = useCallback(async () => {
    if (!xtermRef.current) return;

    terminal.current = new Terminal({
      theme: {
        background: '#fff',
        cursor: '#DAC342',
        selection: 'rgba(61, 152, 211, .5)',
        foreground: '#141419'
      },
      ...xtermConfig
    });
    fitAddon.current = new FitAddon();
    try {
      webglAddon.current = new WebglAddon();
    } catch (e) {
      webglAddon.current = null;
    }

    terminal.current?.loadAddon(fitAddon.current);
    terminal.current.loadAddon(new SearchAddon());
    terminal.current?.loadAddon(new WebLinksAddon());

    terminal.current?.open(xtermRef.current);

    webglAddon.current && terminal.current?.loadAddon(webglAddon.current);

    fit();

    terminal.current?.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
    terminal.current?.onData((input) => {
      const msg = `0${base64Encode(input)}`;
      write(msg);
    });
  }, [fit, write]);

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const clear = () => {
    terminal.current?.clear();
  };

  // 连接websocket
  const connect = useCallback(async () => {
    if (socket.current) {
      await socket.current.disconnect();
      socket.current = null;
      terminal.current?.reset();
    }
    socket.current = new Socket(socketURL + tab.pid, false, 0, 'base64.channel.k8s.io');
    socket.current.addEventListener(EVENT_CONNECTING, () => {
      setIsOpen(false);
    });
    socket.current.addEventListener(EVENT_CONNECT_ERROR, () => {
      setIsOpen(false);
    });
    socket.current.addEventListener(EVENT_CONNECTED, () => {
      setIsOpen(true);
      fit();
    });
    socket.current.addEventListener(EVENT_DISCONNECTED, () => {
      setIsOpen(false);
    });
    socket.current.addEventListener(EVENT_MESSAGE, (e: any) => {
      // terminal.current?.write(event.detail.data.toString());
      const type = e.detail.data.substr(0, 1);
      const msg = base64Decode(e.detail.data.substr(1));

      if (`${type}` === '1') {
        terminal.current?.write(msg);
      } else {
        console.error(msg);
      }
    });

    socket.current.connect();
    terminal.current?.focus();
  }, [fit, tab.pid]);

  useEffect(() => {
    fit();
  }, [fit, termHeight]);

  useEffect(() => {
    setupTerminal();
    connect();
    keepAliveTimer.current = setInterval(() => {
      fit();
    }, 60 * 1000);
    return () => {
      clearInterval(keepAliveTimer.current);
      cleanup();
    };
  }, [cleanup, connect, fit, setupTerminal]);

  return <div ref={xtermRef} style={{ width: '100%', height: '100%' }}></div>;
};
export default Shell;
