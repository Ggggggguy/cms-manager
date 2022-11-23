/*
 * @Author: amanda zhurunwen98@163.com
 * @Date: 2022-07-21 20:02:58
 * @LastEditors: amanda zhurunwen98@163.com
 * @LastEditTime: 2022-08-22 21:19:58
 * @FilePath: \cms-manage\src\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Outlet } from "react-router-dom";
import { Layout } from 'antd';
import './assets/base.less'
import Header from './components/Header';
import Aside from './components/Aside';
import Bread from './components/Bread';


const { Sider, Content } = Layout;
export default function App() {

  return (
    <Layout id='app-page'>
      <Header />

      <Layout>
        <Sider><Aside /></Sider>
        <Content>
          <div className='container_box'>
            <Bread />
            <div className='container_content'>
              <Outlet />
            </div>

          </div>
        </Content>
      </Layout>
      <footer>Respect | Copyright &copy; 2022 Author 你单排吧</footer>
    </Layout>

  )
}



