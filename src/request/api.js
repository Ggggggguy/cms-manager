/*
 * @Author: amanda zhurunwen98@163.com
 * @Date: 2022-07-24 16:30:34
 * @LastEditors: amanda zhurunwen98@163.com
 * @LastEditTime: 2022-08-21 20:40:56
 * @FilePath: \cms-manage\src\request\api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from './request'


//注册
export const RegisterApi = (params) => request.post('/register', params)


//登录
export const LoginApi = (params) => request.post('/login', params)

//获取文章列表
export const ArticleListApi = (params) => request.get('/article', { params })

//添加文章
export const ArticleAddApi = (params) => request.post('/article/add', params)


//查看文章
export const ArticleSearchApi = (params) => request.get(`/article/${params.id}`)


//重新编辑文章
export const ArticleUpdateApi = (params) => request.put('/article/update', params)

//删除文章
export const ArticleDeleteApi = (params) => request.post('/article/remove', params)

//获取用户资料
export const GetUserDataApi = () => request.get('/info')

//修改用户资料
export const UpdateUserDataApi = (params) => request.put('/info', params)
