/*
 * @Author: amanda zhurunwen98@163.com
 * @Date: 2022-07-21 20:02:58
 * @LastEditors: amanda zhurunwen98@163.com
 * @LastEditTime: 2022-07-21 20:30:34
 * @FilePath: \cms-manage\src\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);


