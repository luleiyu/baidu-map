import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
// import store from '../store'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  timeout: 15000
})

// request拦截器
service.interceptors.request.use(config => {
  // if (getToken()) {
  //   config.headers['Access-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  // config.headers['ics-token'] = '446a654cf768818ef76645fd8a09eacd'
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
}, error => {
// Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
