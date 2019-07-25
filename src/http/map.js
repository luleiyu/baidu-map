import axios from './require'
const AK = '7i9g8ryzpvi8QnhexRUIOhvk9oQ3qNNj'
const API_PROXY = 'https://bird.ioliu.cn/v1/?url='

// 获取百度地图搜索结果
export function baiduMap (param) {
  let url = `/api?query=${param.address}&region=${param.city}&output=json&ak=${AK}`
  if (process.env.NODE_ENV === 'production') {
    url = `${API_PROXY}http://api.map.baidu.com/place/v2/search?query=${param.address}&region=${param.city}&output=json&ak=${AK}`
  }
  return axios({
    url: url,
    method: 'get'
  })
}
