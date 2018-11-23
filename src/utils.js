/*
* @Author: Star
* @Date:   2018-11-17 16:50:04
* @Last Modified by:   Star
* @Last Modified time: 2018-11-19 22:56:55
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
