/*
 * @Author: amanda zhurunwen98@163.com
 * @Date: 2022-08-22 20:44:47
 * @LastEditors: amanda zhurunwen98@163.com
 * @LastEditTime: 2022-08-22 20:46:27
 * @FilePath: \cms-manage\src\store\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import reducer from "../reducer";
import { legacy_createStore as createStore } from "redux"


const store = createStore(reducer)
export default store