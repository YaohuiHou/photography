import fetch from './ajax'

export const DEBUG = true // 是否开发模式
const HTTP_DEV = 'http://localhost:8080/wx/' // 开发模式
const HTTP = 'https://www.goodwell.top/wx/' // 正式地址


const URLS = DEBUG ? HTTP_DEV : HTTP
class XHR {
  // 注册
  userRegister(json) {
      //  {"username":"xiaobei","password","123456","mobile":"15503687038"}
      return fetch({
        url: `${URLS}auth/register`,
        body: json,
        type: 'POST'
      })
    }
    // 登录
  userLogin(json) {
      //  {"username":"xiaobei","password","123456"}
      return fetch({
        url: `${URLS}auth/login`,
        body: json,
        type: 'POST'
      })
    }
    // 获取个人信息
  getUserInfo(json) {
      return fetch({
        url: `${URLS}user/info`,
        body: json,
        type: 'GET'
      })
    }
    // 修改个人信息
  editUserInfo(json) {
    return fetch({
      url: `${URLS}auth/updateAuthInfo`,
      body: json,
      type: 'POST'
    })
  }

}
export default new XHR()