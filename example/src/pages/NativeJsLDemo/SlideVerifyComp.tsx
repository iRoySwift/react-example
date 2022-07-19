import React, { useEffect } from 'react';
import '@/components/NativeJs/SlideVerify/index.css';
import SlideVerify from '@/components/NativeJs/SlideVerify/index.js';

interface Props {}

const SlideVerifyComp: React.FC<Props> = () => {
  useEffect(() => {
    new SlideVerify({
      renderTo: 'captcha',
      captchaMode: 'float', // float embed popup
      data: 'https://picsum.photos/id/587/310/155',
      width: 343,
      height: 200,
      // data: '/itaas/getSlideImage',
      // data: 'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ',
      onSucess: () => {},
      onError: () => {}
    });
  }, []);
  return (
    <div>
      图片滑动验证
      <div id="captcha">
        {/* <div className="loading">
          <div className="load-icon"></div>
          <span>加载中...</span>
        </div>
        <div className="canvas">
          <canvas width={310} height={155}></canvas>
          <div className="refresh-icon"></div>
          <canvas width={63} height={155}></canvas>
        </div>
        <div className="slide-container">
          <div className="slide-mask">
            <div className="slider">
              <div className="slide-icon"></div>
            </div>
          </div>
          <span className="slide-text">拖动滑动完成拼图</span>
        </div> */}
      </div>
    </div>
  );
};
export default SlideVerifyComp;
