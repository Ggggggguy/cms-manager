/*
 * @Author: amanda zhurunwen98@163.com
 * @Date: 2022-08-08 20:27:18
 * @LastEditors: amanda zhurunwen98@163.com
 * @LastEditTime: 2022-08-21 14:02:45
 * @FilePath: \cms-manage\src\components\Bread.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react'
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';

export default function Bread() {
  const [BreadName, setBreadName] = useState('')
  const { pathname } = useLocation()

  //监听路由的路径变化
  useEffect(() => {
    switch (pathname) {
      case "/list":
        setBreadName("文章列表")
        break
      case "/edit":
        setBreadName("文章编辑")
        break
      case "/means":
        setBreadName("修改资料")
        break
      default:
        setBreadName(pathname.includes('edit') ? '文章编辑' : "")
        break
    }
  }, [pathname])
  return (
    <Breadcrumb style={{ height: '30px', lineHeight: '30px' }}>
      <Breadcrumb.Item href='/'>
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item>{BreadName}</Breadcrumb.Item>
    </Breadcrumb>
  )
}
