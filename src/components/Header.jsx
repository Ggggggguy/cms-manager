/*
 * @Author: amanda zhurunwen98@163.com
 * @Date: 2022-07-25 20:36:54
 * @LastEditors: amanda zhurunwen98@163.com
 * @LastEditTime: 2022-08-22 21:17:50
 * @FilePath: \cms-manage\src\components\Header.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, message } from 'antd';
import defaultAvatar from '../assets/defaultAvatar.jpg'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';


function Header() {
  const navigate = useNavigate()
  const [avatar, setAvatar] = useState(defaultAvatar)
  const [username, setUsername] = useState("游客")

  //模拟componentDidMount
  useEffect(() => {
    let newUsername = localStorage.getItem('username')
    let newAvatar = localStorage.getItem('avatar')
    if (newUsername) setUsername(newUsername)
    if (newAvatar) {
      //http://47.93.114.103:6688/
      setAvatar("http://47.93.114.103:6688/" + newAvatar)
    }
  }, [])

  //退出登录
  const logout = () => {
    localStorage.clear()   //清除缓存
    message.success("退出成功，即将返回登录页")
    setTimeout(() => {
      navigate("/login")
    }, 1500)
  }
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              修改资料
            </a>
          ),
        },
        {
          type: 'divider',
        },
        {
          key: '2',
          label: (
            <span onClick={logout}>
              退出登录
            </span>
          ),
        },

      ]}
    />
  );
  return (
    <div>
      <header>
        <img src={logo} alt='' className='logo' />
        <div className='right'>
          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()} className="ant-dropdown-link">
              <Space>
                <img src={avatar} alt="" className='avatar' />
                <span>{username}</span>
                <CaretDownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </header>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    myKey: state.myKey
  }
}

export default connect(mapStateToProps)(Header)
