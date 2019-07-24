import wx from 'weixin-js-sdk'
// import axios from 'axios'
import { getWeixinSign } from '@/http/weixin'
// import store from '../store'

var signPackage = {
  appId: '', // 必填，公众号的唯一标识
  timestamp: '', // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '' // 必填，签名，见附录1
}

// 获取签名分享
export function getWeixinSignPackage (selfTitle, shareDesc, url, logoImg, id, audio, callFunc) {
  return new Promise((resolve, reject) => {
    getWeixinSign().then(response => {
      console.log(response)
      if (response && response.result) {
        signPackage = response.result
        setWeiXinConfig(selfTitle, shareDesc, url, logoImg, id, audio, callFunc)
      }
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

function setWeiXinConfig (selfTitle, shareDesc, url, logoImg, id, audio, callFunc) {
  // debugger
  /*
  * 注意：
  * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
  * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
  * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
    *
  * 如有问题请通过以下渠道反馈：
  * 邮箱地址：weixin-open@qq.com
  * 邮件主题：【微信JS-SDK反馈】具体问题
  * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
  */
  // 配置参数
  wx.config({
    debug: false, // 生产环境需要关闭debug模式
    appId: signPackage.appId, // appId通过微信服务号后台查看
    timestamp: signPackage.timestamp, // 生成签名的时间戳
    nonceStr: signPackage.nonceStr, // 生成签名的随机字符串
    signature: signPackage.signature, // 签名
    jsApiList: [// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      // 所有要调用的 API 都要加到这个列表中
      'checkJsApi', // 判断当前客户端是否支持指定JS接口
      'onMenuShareTimeline', // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
      'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
      'onMenuShareQQ', // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
      'onMenuShareWeibo', // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
      'hideOptionMenu', // 隐藏右上角菜单接口
      'showOptionMenu', // 显示右上角菜单接口
      'closeWindow', // 关闭当前网页窗口接口,
      'updateAppMessageShareData', // 分享朋友和qq
      'updateTimelineShareData', // 分享朋友圈和qq空间
      'hideMenuItems' // 批量隐藏功能按钮接口
    ]
  })

  wx.ready(function () {
    console.log(logoImg, 'wx.ready')
    setWeiXinShareAppMessage(selfTitle, shareDesc, url, logoImg, id, audio, callFunc)
    setWeiXinShareTimeline(selfTitle, shareDesc, url, logoImg, id, audio, callFunc)
    setQQShareAppMessage(selfTitle, shareDesc, url, logoImg, id, audio, callFunc)
    setQZoneShareAppMessage(selfTitle, shareDesc, url, logoImg, id, audio, callFunc)
    wx.hideMenuItems({
      menuList: [
        'menuItem:copyUrl' // 复制链接
        // 'menuItem:editTag', // 编辑标签
        // 'menuItem:delete', // 删除
        // 'menuItem:originPage', // 原网页
        // 'menuItem:readMode', // 阅读模式
        // 'menuItem:openWithQQBrowser', // 在QQ浏览器中打开
        // 'menuItem:openWithSafari', // 在Safari中打开
        // 'menuItem:share:email', // 邮件
        // 'menuItem:share:brand', // 一些特殊公众号
        // 'menuItem:share:qq', // 分享到QQ
        // 'menuItem:share:QZone' // 分享到 QQ 空间
      ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
    })
    // wx.checkJsApi({
    //   jsApiList: [
    //       // 所有要调用的 API 都要加到这个列表中
    //     'updateAppMessageShareData',
    //     'updateTimelineShareData',
    //     'onMenuShareAppMessage',
    //     'onMenuShareTimeline',
    //     'closeWindow',
    //     'onMenuShareQQ',
    //     'onMenuShareWeibo',
    //     'hideOptionMenu',
    //     'showOptionMenu'
    //     // 'chooseImage'
    //   ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    //   success: function (res) {
    //     console.log(res)
    //           // 以键值对的形式返回，可用的api值true，不可用为false
    //           // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    //   }
    // })

    // setWeiXinShareAppMessage('加入我们快来免费领取价值298元的听课大礼包！，成为学霸', '', null)
    // setWeiXinShareTimeline('快来免费领取价值298元的听课大礼包！', '', null)
    // newSetWeiXinShareAppMessage('想了解你的真实英语水平吗？快来试试吧。', '', null)
    // newSetWeiXinShareTimeline('想了解你的真实英语水平吗？快来试试吧。', '', null)
    // alert('lu----leiyu')
    console.log('######')
  })
  wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    console.log('weixin err:' + JSON.stringify(res))
  })
}
/**
 * 新版 ---- 获取微信分享到朋友圈
 */
function newSetWeiXinShareTimeline (title, url, logoImg, id, audio, callFunc) {
  // alert('----leiyu')
  if (url === null || url === undefined) {
    url = ''
  }
  // alert('luleiyu')
  wx.updateTimelineShareData({
    title: title,
    // link: url !== '' ? url : location.href.split('#')[0] + '?agentId=' + store.getters.isForward,
    link: 'assessment.quxueabc.com/client/index.html',
    img_url: 'http://assessment.quxueabc.com/client/logo.png',
    trigger: () => {
      // alert('用户点击发送给朋友')
    },
    success: () => {
      if (callFunc) callFunc()
      alert('已分享')
    },
    cancel: () => {
      if (callFunc) callFunc()
      alert('已取消')
    },
    fail: (res) => {
      // alert(JSON.stringify(res))
    }
  })
}
/**
 * 新版 ----- 获取微信分享到朋友
 */
function newSetWeiXinShareAppMessage (title, url, logoImg, id, audio, callFunc) {
  // alert('lulei----yu')
  if (url === null || url === undefined) {
    url = ''
  }
  // alert('lulei----yu')
  wx.updateAppMessageShareData({
    title: title,
    desc: '我已成功领取价值298元的听课大礼包，快来和我一起领取学习吧！',
    // link: url !== '' ? url : location.href.split('#')[0] + '?agentId=' + store.getters.isForward,
    link: 'assessment.quxueabc.com/client/index.html',
    img_url: 'http://assessment.quxueabc.com/client/logo.png',
    trigger: () => {
      // alert('用户点击发送给朋友')
    },
    success: () => {
      if (callFunc) callFunc()
      alert('已分享')
    },
    cancel: () => {
      if (callFunc) callFunc()
      alert('已取消')
    },
    fail: (res) => {
      // alert(JSON.stringify(res))
    }
  })
}
/**
 * 获取微信分享到朋友圈
 */
function setWeiXinShareTimeline (title, shareDesc, url, logoImg, id, audio, callFunc) {
  // alert('123')
  // debugger
  // audio.pause()
  if (url === null || url === undefined) {
    url = ''
  }
  let localtionUrl = ''
  if (url === '') {
    let d = window.location.href
    if (d.indexOf('QR') > -1) {
      localtionUrl = d.replace(/QR/g, 'SS')
      if (localtionUrl.indexOf('#') > -1) {
        localtionUrl = localtionUrl.split('#')[0]
      }
    }
  }
  // alert('456')
  // debugger
  wx.onMenuShareTimeline({
    title: title,
    link: url !== '' ? url : localtionUrl,
    imgUrl: logoImg == '' ? 'http://english.quxueabc.com/quxueabc/logo.png' : logoImg,
    trigger: () => {
      console.log(audio)
      // audio.pause()
      // debugger
    },
    success: () => {
      // debugger
      // alert('用户点击成功')
      console.log(callFunc, 'callfunc')
      if (callFunc) callFunc()
      // alert('789')
    },
    cancel: () => {
      // audio.pause()
      // debugger
      // alert('用户点击取消')
      if (callFunc) callFunc()
      // alert('10,11')
    },
    fail: (res) => {
      // audio.pause()
      // debugger
      // alert('用户点击失败')
      console.log(res)
      // alert(JSON.stringify(res))
    }
  })
}

/**
 * 获取微信分享到朋友
 */
export function setWeiXinShareAppMessage (title, shareDesc, url, logoImg, id, audio, callFunc) {
  // debugger
  // alert('12,13')
  // audio.pause()
  if (url === null || url === undefined) {
    url = ''
  }
  let localtionUrl = ''
  if (url === '') {
    let d = window.location.href
    if (d.indexOf('QR') > -1) {
      localtionUrl = d.replace(/QR/g, 'SS')
      if (localtionUrl.indexOf('#') > -1) {
        localtionUrl = localtionUrl.split('#')[0]
      }
    }
  }
  console.log(logoImg, 'setWeiXinShareAppMessage')
  // debugger
  // alert('14,15')
  wx.onMenuShareAppMessage({
    title: title,
    desc: shareDesc,
    link: url !== '' ? url : localtionUrl,
    imgUrl: logoImg == '' ? 'http://english.quxueabc.com/quxueabc/logo.png' : logoImg,
    trigger: () => {
      console.log(audio)
      // audio.pause()
      // debugger
      // alert('00000000')
    },
    success: () => {
      if (callFunc) callFunc()
      // debugger
      // alert('16,17')
    },
    cancel: () => {
      // audio.pause()
      if (callFunc) callFunc()
      // debugger
      // alert('18,19')
    },
    fail: (res) => {
      // audio.pause()
      // debugger
      console.log(res)
      // debugger
      // alert(JSON.stringify(res))
    }
  })
}

/**
 * 获取微信分享到QQ好友
 */
export function setQQShareAppMessage (title, shareDesc, url, logoImg, id, audio, callFunc) {
  // debugger
  // alert('12,13')
  if (url === null || url === undefined) {
    url = ''
  }
  let localtionUrl = ''
  if (url === '') {
    let d = window.location.href
    if (d.indexOf('QR') > -1) {
      localtionUrl = d.replace(/QR/g, 'SS')
      if (localtionUrl.indexOf('#') > -1) {
        localtionUrl = localtionUrl.split('#')[0]
      }
    }
  }
  console.log(logoImg, 'setWeiXinShareAppMessage')
  wx.onMenuShareQQ({
    title: title, // 分享标题
    desc: shareDesc, // 分享描述
    link: url !== '' ? url : localtionUrl, // 分享链接
    imgUrl: logoImg === '' ? 'http://english.quxueabc.com/quxueabc/logo.png' : logoImg, // 分享图标
    trigger: () => {
      // alert('00000000')
    },
    success: () => {
      if (callFunc) callFunc()
      // alert('16,17')
    },
    cancel: () => {
      if (callFunc) callFunc()
      // alert('18,19')
    },
    fail: (res) => {
      console.log(res)
      // alert(JSON.stringify(res))
    }
  })
}

/**
 * 获取微信分享到QQ空间
 */
export function setQZoneShareAppMessage (title, shareDesc, url, logoImg, id, audio, callFunc) {
  // debugger
  // alert('12,13')
  if (url === null || url === undefined) {
    url = ''
  }
  let localtionUrl = ''
  if (url === '') {
    let d = window.location.href
    if (d.indexOf('QR') > -1) {
      localtionUrl = d.replace(/QR/g, 'SS')
      if (localtionUrl.indexOf('#') > -1) {
        localtionUrl = localtionUrl.split('#')[0]
      }
    }
  }
  console.log(logoImg, 'setWeiXinShareAppMessage')
  // debugger
  // alert('14,15')
  wx.onMenuShareQZone({
    title: title, // 分享标题
    desc: shareDesc, // 分享描述
    link: url !== '' ? url : localtionUrl, // 分享链接
    imgUrl: logoImg === '' ? 'http://english.quxueabc.com/quxueabc/logo.png' : logoImg, // 分享图标
    trigger: () => {
      // debugger
      // alert('00000000')
    },
    success: () => {
      if (callFunc) callFunc()
      // debugger
      // alert('16,17')
    },
    cancel: () => {
      if (callFunc) callFunc()
      // debugger
      // alert('18,19')
    },
    fail: (res) => {
      // debugger
      console.log(res)
      // debugger
      // alert(JSON.stringify(res))
    }
  })
}

export function chooseImage () {
  wx.chooseImage({
    count: 9, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      console.log(res.localIds) // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    }
  })
}

function pushHistory () {
  var state = {
    title: 'title',
    url: '#'
  }
  window.history.pushState(state, 'title', '#')
}

export function weixinBackClose () {
  pushHistory()
  window.addEventListener('popstate', function (e) {
    // alert("我监听到了浏览器的返回按钮事件啦") // 根据自己的需求实现自己的功能
    wx.closeWindow()
  })
}
