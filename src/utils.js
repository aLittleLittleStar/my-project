/*
* @Author: Star
* @Date:   2018-11-17 16:50:04
* @Last Modified by:   Star
* @Last Modified time: 2018-11-24 18:12:41
*/
import config from './config'

// http get 工具函数 获取数据
export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}
/* 发起网络请求 */
function request (url, method, data) {
  return new Promise((resolve, reject) => {
    /* [发起网络请求](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html) */
    wx.request({
      data,
      method,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}
export function showModal (title, content) {
  /* [showModal](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showModal.html) */
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

export function showSuccess (text) {
  /* [showToast](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html) */
  wx.showToast({
    title: text,
    icon: 'success'
  })
}
