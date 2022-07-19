import React from 'react';
import Message from './Message';
import SlideVerify from './SlideVerifyComp';

interface Props {}
const NativeJsList: React.FC<Props> = () => {
  return (
    <div>
      组件
      <Message />
      <SlideVerify />
    </div>
  );
};
export default NativeJsList;
