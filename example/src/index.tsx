/*
 * @Author: Roy
 * @Date: 2022-06-15 17:07:59
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-22 15:30:18
 * @Description: 请填写简介
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@amap/amap-jsapi-types';
import '@/utils/i18n';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

console.info('%c%s', 'color: rgb(120, 187, 120); font-size: 24px;', 'Project is running!');
console.info(
  `%c react-devtools %c Detected React v${React.version} %c`,
  'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
  'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
  'background:transparent'
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
