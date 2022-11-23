/*
 * @Author: amanda zhurunwen98@163.com
 * @Date: 2022-07-28 20:19:23
 * @LastEditors: amanda zhurunwen98@163.com
 * @LastEditTime: 2022-08-21 13:28:45
 * @FilePath: \cms-manage\src\components\Aside.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { EditOutlined, ReadOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate, useLocation } from "react-router-dom"


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('查看文章列表', 'list', <ReadOutlined />),
  getItem('文章编辑', 'edit', <EditOutlined />),
  getItem('修改资料', 'means', <DatabaseOutlined />),
];
export default function Aside() {
  const navigate = useNavigate()
  const location = useLocation()
  const [defaultKey, setDefaultKey] = useState("")
  const onClick = (e) => {
    // console.log('click ', e);
    navigate("/" + e.key)
    setDefaultKey(e.key)
  };
  useEffect(() => {
    let path = location.pathname
    let key = path.split("/")[1]
    setDefaultKey(key)
    // eslint-disable-next-line
  }, [location.pathname])

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 200,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={[defaultKey]}
      mode="inline"
      items={items}
      theme="dark"
    />
  );
};


