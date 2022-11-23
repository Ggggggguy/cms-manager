/*
 * @Author: amanda zhurunwen98@163.com
 * @Date: 2022-07-21 20:15:11
 * @LastEditors: amanda zhurunwen98@163.com
 * @LastEditTime: 2022-08-18 21:11:12
 * @FilePath: \cms-manage\src\router\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import App from "../App";
import List from "../pages/List"
import Edit from "../pages/Edit"
import Login from "../pages/Login"
import Means from "../pages/Means"
import Register from "../pages/Register"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const BaseRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/list" element={<List />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="/means" element={<Means />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>

    </Routes>
  </Router>
)
export default BaseRouter