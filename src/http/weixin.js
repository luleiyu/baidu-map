import request from './weixinrequire'
// import axios from 'axios'
// import request from '@/utils/request'
// 获取微信签名
export function getWeixinSign () {
  return request({
    url: '/wxAuthorization?url=' + encodeURIComponent(location.href.split('#')[0]) + '&typeId=1',
    method: 'post'
    // url: 'evaluation/wxShareAuthorization?url=' + encodeURIComponent(location.href.split('#')[0]),
    // url: 'evaluation/wxShareAuthorization?url=' + encodeURIComponent('http://assessment.quxueabc.com/client/index.html'),
  })
}
