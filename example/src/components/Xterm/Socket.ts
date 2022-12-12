/*
 * @Author: Roy
 * @Date: 2022-06-22 09:44:51
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-29 16:56:29
 * @Description: 请填写简介
 */
// let sockId = 1;
// let warningShown = false;
// let wasConnected = false;

// const INSECURE = 'ws://';
// const SECURE = 'wss://';

const STATE_DISCONNECTED = 'disconnected';
const STATE_CONNECTING = 'connecting';
const STATE_CONNECTED = 'connected';
const STATE_CLOSING = 'closing';
// const STATE_RECONNECTING = 'reconnecting';

export const EVENT_CONNECTING = STATE_CONNECTING;
export const EVENT_CONNECTED = STATE_CONNECTED;
export const EVENT_DISCONNECTED = STATE_DISCONNECTED;
export const EVENT_MESSAGE = 'message';
export const EVENT_FRAME_TIMEOUT = 'frame_timeout';
export const EVENT_CONNECT_ERROR = 'connect_error';

export default class Socket extends EventTarget {
  url;
  autoReconnect = true;
  frameTimeout = 35000;
  metadata = {};
  protocol;

  socket: WebSocket | null = null;
  state = STATE_DISCONNECTED;
  constructor(url, autoReconnect = true, frameTimeout: any = null, protocol: any = null) {
    super();

    this.setUrl(url);
    this.autoReconnect = autoReconnect;
    this.protocol = protocol;

    if (frameTimeout !== null) {
      this.frameTimeout = frameTimeout;
    }
  }
  setUrl(url) {
    this.url = url;
  }
  connect() {
    if (this.socket) {
      console.error('Socket refusing to connect while another socket exists'); // eslint-disable-line no-console
      return;
    }

    let socket;
    let url = this.url;
    if (this.protocol) {
      socket = new WebSocket(url, this.protocol);
    } else {
      socket = new WebSocket(url);
    }

    socket.onmessage = this._onmessage.bind(this);
    socket.onopen = this._onopen.bind(this);
    socket.onerror = this._onerror.bind(this);
    socket.onclose = this._onclose.bind(this);

    this.state = STATE_CONNECTING;
    this.socket = socket;

    this.dispatchEvent(new CustomEvent(EVENT_CONNECTING));
  }
  send(data) {
    if (this.socket && this.state === STATE_CONNECTED) {
      this.socket.send(data);
      return true;
    }
    return false;
  }
  disconnect() {
    const promise = new Promise<void>((resolve) => {
      if ((this.state = STATE_DISCONNECTED)) {
        resolve();
      }
    });
    this._onclose();
    return promise;
  }
  _onmessage(event) {
    this.dispatchEvent(new CustomEvent(EVENT_MESSAGE, { detail: event }));
  }
  _onopen() {
    this.state = STATE_CONNECTED;
    this.dispatchEvent(new CustomEvent(EVENT_CONNECTED));
  }
  _onerror() {}
  _onclose() {
    if (!this.socket) {
      return;
    }
    this.socket.onopen = null;
    this.socket.onerror = null;
    this.socket.onmessage = null;
    this.dispatchEvent(new CustomEvent(EVENT_DISCONNECTED));
    this.socket.close();
    this.state = STATE_CLOSING;
  }
}
