/*
 * @Author: amanda zhurunwen98@163.com
 * @Date: 2022-07-21 20:12:50
 * @LastEditors: amanda zhurunwen98@163.com
 * @LastEditTime: 2022-08-21 14:36:20
 * @FilePath: \cms-manage\src\pages\List.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { List, Skeleton, Pagination, Button, message } from 'antd';
// import { useNavigate } from 'react-router-dom';
import { ArticleListApi, ArticleDeleteApi } from '../request/api';
import "./less/list.less"
import moment from "moment"
import { useNavigate } from 'react-router-dom';

export default function ArticleList() {
  const [list, setList] = useState([]);
  //分页
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const navigate = useNavigate()
  const [update, setUpdate] = useState(1)


  //请求封装
  const getList = (num) => {
    ArticleListApi({
      num,
      count: pageSize
    }).then(res => {
      console.log(res);
      if (res.errCode === 0) {
        let { arr, count, num, total } = res.data
        setList(arr)
        setTotal(total)
        setCurrent(num)
        setPageSize(count)
      }
    })
  }
  //请求列表数据
  useEffect(() => {
    getList(current)
  }, [])

  //模拟componentDidUpdate
  useEffect(() => {
    getList(current)
  }, [update])
  //分页
  const onChange = (pages) => {
    getList(pages)
  }
  //删除文章
  const delFn = (id) => {
    ArticleDeleteApi({ id }).then(res => {
      if (res.errCode === 0) {
        message.success(res.message)
        //重新刷新页面，或者重新请求这个列表的数据 window.reload   调用getList(current) 增加变量的检测
        setUpdate(update + 1)
      } else {
        message.success(res.message)
      }
    })
  }

  return (
    <div className="list_table" style={{ padding: '20px' }}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => navigate("/edit/" + item.id)}> 编辑</Button>,
              <Button type='danger' onClick={() => delFn(item.id)}>删除</Button>
            ]
            }
          >
            <Skeleton loading={false} active>
              <List.Item.Meta
                title={<a href={"http://47.93.114.103:8765/manage/article/" + item.id} target="_blank" rel="noreferrer">{item.title}</a>}
                description={item.subTitle}
              />
              <div>{moment(item.date).format("YYYY-MM-DD hh:mm:ss")}</div>
            </Skeleton>
          </List.Item >
        )}
      />
      < Pagination onChange={onChange} total={total} current={current} pageSize={pageSize} style={{ float: 'right', marginTop: '20px' }} />
    </div >
  )
}
