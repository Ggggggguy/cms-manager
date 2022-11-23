/*
 * @Author: amanda zhurunwen98@163.com
 * @Date: 2022-07-21 20:12:04
 * @LastEditors: amanda zhurunwen98@163.com
 * @LastEditTime: 2022-07-24 20:10:12
 * @FilePath: \cms-manage\src\pages\Login.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './less/login.less'
import logo from '../assets/logo.png'
import { LoginApi } from '../request/api';

export default function Login() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    LoginApi({
      username: values.username,
      password: values.password
    }).then((res) => {
      if (res.errCode === 0) {
        message.success(res.message);
        //存储数据
        localStorage.setItem('avatar', res.data.avatar)
        localStorage.setItem('cms-token', res.data['cms-token'])
        localStorage.setItem('editable', res.data.editable)
        localStorage.setItem('player', res.data.player)
        localStorage.setItem('username', res.data.username)
        //跳转到根路径
        setTimeout(() => {
          navigate('/')
        }, 1500)
      } else {
        message.error(res.message);
      }
    })
  };


  return (
    <div className='login'>
      <div className='login_box'>
        <img src={logo} alt="" />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名！',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" size='large' />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" size='large' />
          </Form.Item>

          <Form.Item>
            <Link to="/register">还没账号？立即注册</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size='large'>
              登录
            </Button>
          </Form.Item>
        </Form>

      </div>
    </div>
  )
}
