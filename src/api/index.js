import fetch from './ajax'

export const DEBUG = false // 是否开发模式
const HTTP_DEV = 'http://localhost:8082/wx/' // 开发模式
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
    // 退出登录
  outLogin(json) {
      return fetch({
        url: `${URLS}auth/logout`,
        body: json,
        type: 'GET'
      })
    }
    // 获取头像信息
  getUserInfo(json) {
      return fetch({
        url: `${URLS}user/index`,
        body: json,
        type: 'GET'
      })
    }
    // 获取个人信息
  getUserAllInfo(json) {
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
    // 获取摄影分类
  getTypeList(json) {
      return fetch({
        url: `${URLS}category/list`,
        body: json,
        type: 'GET'
      })
    }
    // 获取地区列表
  getCityList(json) {
      return fetch({
        url: `${URLS}region/list`,
        body: json,
        type: 'GET'
      })
    }
    // 修改保存作品集
  updateMyWorks(json) {
      return fetch({
        url: `${URLS}collection/save`,
        body: json,
        type: 'POST'
      })
    }
    // 获取作品
  getMyWorks(json) {
      return fetch({
        url: `${URLS}collection/detail`,
        body: json,
        type: 'GET'
      })
    }
    // 保存我的器材
  saveMaterial(json) {
      return fetch({
        url: `${URLS}material/save`,
        body: json,
        type: 'POST'
      })
    }
    // 获取器材详情
  getMaterial(json) {
      return fetch({
        url: `${URLS}material/detail`,
        body: json,
        type: 'GET'
      })
    }
    // 获取商城详情
  saveMallDetail(json) {
      return fetch({
        url: `${URLS}store/save`,
        body: json,
        type: 'POST'
      })
    }
    // 获取商城详情
  getMallDetail(json) {
      return fetch({
        url: `${URLS}store/detail`,
        body: json,
        type: 'GET'
      })
    }
    // 上传图片
  UploadImg(json) {
      return fetch({
        url: `${URLS}storage/upload`,
        body: json,
        type: ''
      })
    }
    // 所有人物列表
  getUsersList(json) {
      return fetch({
        url: `${URLS}user/list`,
        body: json,
        type: 'GET'
      })
    }
    // 用户详情
  getUsersDefile(json) {
    return fetch({
      url: `${URLS}user/detail`,
      body: json,
      type: 'GET'
    })
  }

  // 留言
  userComment(json) {
    return fetch({
      url: `${URLS}comment/post`,
      body: json,
      type: 'POST'
    })
  }

  // 获取留言列表
  getComment(json) {
      return fetch({
        url: `${URLS}comment/list`,
        body: json,
        type: 'GET'
      })
    }
    // 获取详情页中的留言列表
  getmyComment(json) {
    return fetch({
      url: `${URLS}comment/mylist`,
      body: json,
      type: 'GET'
    })
  }

  getPassword(json) {
    return fetch({
      url: `${URLS}auth/forget`,
      body: json,
      type: 'GET'
    })
  }
}
export default new XHR()