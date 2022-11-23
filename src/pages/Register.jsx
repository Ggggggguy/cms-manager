/*
 * @Author: amanda zhurunwen98@163.com
 * @Date: 2022-07-21 20:12:25
 * @LastEditors: amanda zhurunwen98@163.com
 * @LastEditTime: 2022-07-24 17:17:25
 * @FilePath: \cms-manage\src\pages\Register.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './less/login.less'
import logo from '../assets/logo.png'
import { RegisterApi } from '../request/api';

export default function Register() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    RegisterApi({
      username: values.username,
      password: values.password
    }).then(res => {
      if (res.errCode === 0) {
        message.success(res.message);
        //跳回登录页
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      } else {
        message.error(res.message);
      }
    }) //跨域
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
          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请再次确认密码！',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="请再次确认密码" size='large' />
          </Form.Item>

          <Form.Item>
            <Link to="/login">已有账号？前往登录</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size='large'>
              立即注册
            </Button>
          </Form.Item>
        </Form>

      </div>
    </div>
  )

}
