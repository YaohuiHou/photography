// require('es6-promise').polyfill();
import axios from 'axios'
import qs from 'qs'

const fetch = ({
  url,
  body,
  type,
  config
}) => {
  if (type === 'POST') {
    // qs.stringify(body)
    return axios.post(url, body, {
      headers: {
        "content-type": "application/json",
        'User-Token': localStorage.getItem('UserTokenHas')
      }
    })
  } else if (type === 'GET') {
    return axios.get(url, {
      params: body,
      headers: {
        'User-Token': localStorage.getItem('UserTokenHas')
      }
    })
  } else {
    // 单独处理上传图片
    return axios.post(url, body)
  }
}
export default fetch