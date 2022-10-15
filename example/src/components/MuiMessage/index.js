import ReactDOM from 'react-dom/client';
import Message from './Message';
const MuiMessage = {
  dom: null,
  success({ content, duration }) {
    this.dom = document.createElement('div');
    const JSXdom = <Message content={content} duration={duration} type="success" />;
    const root = ReactDOM.createRoot(this.dom);
    root.render(JSXdom);
    // document.body.appendChild(this.dom);
  },
  error({ content, duration }) {
    this.dom = document.createElement('div');
    const JSXdom = <Message content={content} duration={duration} type="error" />;
    ReactDOM.render(JSXdom, this.dom);
    document.body.appendChild(this.dom);
  },
  warning({ content, duration }) {
    this.dom = document.createElement('div');
    this.dom.id = 'MuiMessage';
    document.body.appendChild(this.dom);
    const JSXdom = <Message content={content} duration={duration} type="warning" />;
    const root = ReactDOM.createRoot(document.getElementById('MuiMessage'));
    root.render(JSXdom);
  },
  info({ content, duration }) {
    this.dom = document.createElement('div');
    const JSXdom = <Message content={content} duration={duration} type="info" />;
    ReactDOM.render(JSXdom, this.dom);
    document.body.appendChild(this.dom);
  }
};
export default MuiMessage;
