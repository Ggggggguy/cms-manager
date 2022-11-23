/*
 * @Author: amanda zhurunwen98@163.com
 * @Date: 2022-08-22 20:31:42
 * @LastEditors: amanda zhurunwen98@163.com
 * @LastEditTime: 2022-08-22 21:05:59
 * @FilePath: \cms-manage\src\store\reducer\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const defaultState = {
  myKey: 1
}

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case "addKeyFn":
      newState.mykey++;
      break;
    default:
      break;
  }
  return newState;

}