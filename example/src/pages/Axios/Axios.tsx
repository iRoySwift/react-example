import { getData } from '@/api';
import React, { useRef } from 'react';
// import axios from 'axios';
// import { AbortController } from 'abortcontroller-polyfill/dist/cjs-ponyfill';

interface Props {}
const AxiosDemo: React.FC<Props> = () => {
  let controller: any = useRef(null);
  const fetchData = () => {
    controller.current = new AbortController();
    getData({ signal: controller.current.signal }).then((res) => {
      console.log(res);
    });
    // fetch('/jsonplaceholder/todos/1', { signal: controller.current.signal }).then((res) => {
    //   console.log(res);
    // });
  };

  const cancel = () => {
    console.log('🚀 ~ file: Axios.tsx:17 ~ cancel ~ controller:', controller);
    controller.current?.abort();
  };
  return (
    <div>
      <div onClick={fetchData}>发送请求</div>
      <div onClick={cancel}>取消请求</div>
    </div>
  );
};
export default AxiosDemo;
