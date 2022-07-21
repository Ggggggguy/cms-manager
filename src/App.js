/*
 * @Author: amanda zhurunwen98@163.com
 * @Date: 2022-07-21 20:02:58
 * @LastEditors: amanda zhurunwen98@163.com
 * @LastEditTime: 2022-07-21 20:31:29
 * @FilePath: \cms-manage\src\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      App...
      <Outlet />
    </div>
  )
}

