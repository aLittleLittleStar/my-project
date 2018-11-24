/*
* @Author: Star
* @Date:   2018-11-17 16:50:04
* @Last Modified by:   Star
* @Last Modified time: 2018-11-24 20:39:17
*/
import config from './config'

export function get (url) {
  return new Promise((resolve, reject) => {
    wx.request({

      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          showModal('失败', res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
}

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
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
