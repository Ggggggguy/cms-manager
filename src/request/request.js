/*
 * @Author: amanda zhurunwen98@163.com
 * @Date: 2022-07-24 16:30:43
 * @LastEditors: amanda zhurunwen98@163.com
 * @LastEditTime: 2022-08-18 20:33:36
 * @FilePath: \cms-manage\src\request\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'

// 配置项
const axiosOption = {
  baseURL: '/api',
  timeout: 5000
}

// 创建一个单例
const instance = axios.create(axiosOption);

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem("cms-token")
  if (token) {
    config.headers = {
      "cms-token": token
    }
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance;
