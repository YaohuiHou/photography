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
    return axios.post(url, qs.stringify(body))
  } else if (type === 'GET') {
    return axios.get(url, {
      params: body
    })
  } else {
    // 单独处理上传图片
    return axios.post(url, body, config)
  }
}
export default fetch