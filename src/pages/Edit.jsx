/*
 * @Author: amanda zhurunwen98@163.com
 * @Date: 2022-07-21 20:13:09
 * @LastEditors: amanda zhurunwen98@163.com
 * @LastEditTime: 2022-08-21 14:09:09
 * @FilePath: \cms-manage\src\pages\Edit.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react'
import { Button, PageHeader, Modal, Form, Input, message } from 'antd';
import moment from 'moment';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { ArticleAddApi, ArticleSearchApi, ArticleUpdateApi } from '../request/api'
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export default function Edit() {
  const [editor, setEditor] = useState(null)
  const [html, setHtml] = useState('')
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const dealData = (errCode, msg) => {
    //关闭对话框
    setIsModalVisible(false);
    if (errCode === 0) {
      message.success(msg)
      //跳回list页面
      navigate("/list")

    } else {
      message.error(msg)

    }
  }

  //对话框点击了提交
  const handleOk = () => {
    // setIsModalVisible(false);//关闭对话框
    form
      .validateFields()   //validate校验 field字段
      .then((values) => {
        form.resetFields();   //重置
        // console.log('Received values of form: ', values);
        let { title, subTitle } = values
        console.log(html);
        //地址栏有id代表现在想要更新一篇文章
        if (params.id) {
          //更新文章的请求
          ArticleUpdateApi({
            title,
            subTitle,
            content: html,
            id: params.id
          }).then(res => {
            dealData(res.errCode, res.message)
          })
        } else {
          //添加文章请求
          ArticleAddApi({
            title,
            subTitle,
            content: html
          }).then(res => {
            dealData(res.errCode, res.message)
          })
        }
      })
      .catch(() => {
        return
      });
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setHtml('<p></p>')
    }, 1500)
  }, [location.pathname])


  //根据地址栏id做请求
  if (params.id) {
    ArticleSearchApi({ id: params.id }).then(res => {
      console.log(res);
      if (res.errCode === 0) {
        // let { title, subTitle } = res.data
        setHtml(res.data.content)
        setTitle(res.data.title)
        setSubTitle(res.data.subTitle)

      }

    })
  }

  const toolbarConfig = {}
  const editorConfig = {
    placeholder: '请输入内容...',
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])
  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={params.id ? () => window.history.back() : null}
        title="文章编辑"
        subTitle={"当前日期：" + moment(new Date()).format("YYYY-MM-DD")}
        extra={
          <Button key="1" type="primary" onClick={() => setIsModalVisible(true)}>
            提交文章
          </Button>
        }
      ></PageHeader>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={editor => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
        <Modal title="填写文章标题" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="提交" cancelText="取消">
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
            autoComplete="on"
            initialValues={{ title, subTitle }}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: '请填写标题',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="副标题"
              name="subTitle"
            >
              <Input />
            </Form.Item>


            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
            </Form.Item>
          </Form>
        </Modal>
      </div>



    </div>
  )
}
