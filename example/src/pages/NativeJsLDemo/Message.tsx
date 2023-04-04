import React, { useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import Message from '@/components/NativeJs/Message/index';
import '@/components/NativeJs/Message/index.css';

interface Props {}
const MessageComp: React.FC<Props> = () => {
  let messageRef: any = useRef(null);
  useEffect(() => {
    messageRef.current = new Message();
  }, []);
  const show = () => {
    messageRef!.current!.success('sse');
    // messageRef!.current!.error({ content: '错误！', duration: 20000, closeable: true });
  };
  return (
    <div>
      消息提示
      <div>
        <Button variant="contained" onClick={show}>
          弹窗消息
        </Button>
      </div>
      {/* <div id="message-container">
        <div className="message">
          <div className="bi icon-info bi-exclamation-circle-fill"></div>
          <div className="text">这是一条正经的消息~</div>
          <div className="close bi bi-x-lg"></div>
        </div>
        <div className="message">
          <div className="bi icon-error bi-x-circle-fill"></div>
          <div className="text">这是一条正经的消息~</div>
          <div className="close bi bi-x-lg"></div>
        </div>
        <div className="message">
          <div className="bi icon-success bi-check-circle-fill"></div>
          <div className="text">这是一条正经的消息~</div>
          <div className="close bi bi-x-lg"></div>
        </div>
        <div className="message">
          <div className="icon-warning bi-exclamation-circle-fill"></div>
          <div className="text">这是一条正经的消息~</div>
          <div className="close bi bi-x-lg"></div>
        </div>
        <div className="message">
          <div className="icon-loading bi-arrow-clockwise"></div>
          <div className="text">这是一条正经的消息~</div>
          <div className="close bi bi-x-lg"></div>
        </div>
      </div> */}
    </div>
  );
};
export default MessageComp;
