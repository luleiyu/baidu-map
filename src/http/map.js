import axios from './require'
const AK = '7i9g8ryzpvi8QnhexRUIOhvk9oQ3qNNj'

// 获取百度地图搜索结果
export function baiduMap (param) {
  let url = `
    /api?query=${param.address}&region=${param.city}&output=json&ak=${AK}
  `
  return axios({
    url: url,
    method: 'get'
  })
}
