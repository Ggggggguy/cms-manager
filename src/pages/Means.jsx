/*
 * @Author: amanda zhurunwen98@163.com
 * @Date: 2022-07-21 20:13:29
 * @LastEditors: amanda zhurunwen98@163.com
 * @LastEditTime: 2022-08-22 21:16:08
 * @FilePath: \cms-manage\src\pages\Means.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import "./less/means.less"
import { Button, Form, Input, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { GetUserDataApi, UpdateUserDataApi } from "../request/api"
import { connect } from 'react-redux';

//将图片路径转base64
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
//限制图片大小只能是200KB
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 / 1024 < 200;

  if (!isLt2M) {
    message.error('Image must smaller than 200KB!');
  }

  return isJpgOrPng && isLt2M;
};
function Means(props) {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  //点击上传图片
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      console.log(info.file.response.data.filePath);
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        //存储图片名称
        localStorage.setItem("avatar", info.file.response.data.filePath)
        //触发Header组件更新
        // window.location.reload()   //强制页面刷新
        //react-redux
        props.addKey()
      });
    }
  };

  useEffect(() => {
    GetUserDataApi().then(res => {
      console.log(res);
      if (res.errCode === 0) {
        message.success(res.message)
        //没效果是因为setXXX是异步的
        // setUsername1(res.data.username)
        // setPassword1(res.data.password)
        //把得到的username赋值给placeholder
        //存到sessionStorage
        sessionStorage.setItem('username', res.data.username)

      }
    })
  }, [])


  //表单提交的事件
  const onFinish = (value) => {
    console.log(value);
    //如果表单的username有值，并且不等于初始化时拿到的username
    if (value.username && value.username !== sessionStorage.getItem("username") && value.password.trim() !== "") {
      //做表单的提交
      UpdateUserDataApi({
        username: value.username,
        password: value.password

      }).then(res => {
        console.log(res);
        //修改完之后不要忘了重新登录
      })

    }
  }
  //上传按钮
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div className='means'>
      <Form
        name="basic"
        style={{ width: 400 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="修改用户名"
          name="username"

        >
          <Input placeholder='请输入新用户名' />
        </Form.Item>

        <Form.Item
          label="修 改 密 码"
          name="password"

        >
          <Input.Password placeholder='请输入新密码' />
        </Form.Item>


        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            提交
          </Button>
        </Form.Item>
      </Form>
      <p>点击下方修改头像：</p>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{ "cms-token": localStorage.getItem("cms-token") }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    addKey() {
      const action = { type: "addKeyFn" }
      dispatch(action)
    }
  }
}
export default connect(null, mapDispatchToProps)(Means)