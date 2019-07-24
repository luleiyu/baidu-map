import axios from 'axios'
// import { Toast } from 'mint-ui'

// 创建axios实例
const service = axios.create({
  // http://101.201.152.181:9189/quxue/wxAuthorization?url=4444444&typeId=1
  // baseURL: '/api', // api的测试base_url
  baseURL: 'http://test.english.talk.quxueabc.com/account/quxue', // 测试
  // baseURL: 'http://101.201.152.181:9189/quxue', // 正式
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers['ics-token'] = '446a654cf768818ef76645fd8a09eacd'
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
}, error => {
// Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 100) {
      // Toast({
      //   message: res.error,
      //   position: 'middle',
      //   duration: 3000
      // })
      // return Promise.reject('error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

export default service
