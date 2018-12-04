# my-project001

> A Mpvue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

设置数据库
create database cAuth;
获取openid
npm install wafer2-client-sdk --save

安装scss
npm install node-sass sass-loader --save 
```

    /* isbn: 书的编号 */
    /* 发请求, async 封装 */
    async addBook (isbn) {
      console.log('isbn', isbn)
      /* 传递给 server/controllers/addbook.js */
      const res = await post('/weapp/addbook', {
        isbn
        // openid: this.userinfo.openId
      })
      if (res.code === 0 && res.data.title) {
        showSuccess('添加成功', `${res.data.title}添加成功`)
      }
    },
    scanBook: function () {
      /* [scanCode](https://developers.weixin.qq.com/miniprogram/dev/api/device/scan/wx.scanCode.html) */
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            // console.log('res', res)
            this.addBook(res.result)
          }
        }
      })
    },
    getSetting () {
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                console.log('res.userInfo', res.userInfo)
                // 用户已经授权过
                console.log('用户已经授权过')
              }
            })
          } else {
            console.log('用户还未授权过')
          }
        }
      })
    },
    bindGetUserInfo (userInfo) {
      // console.log(res.mp.detail.rawData)
      if (userInfo) {
        // 用户按了允许授权按钮
        console.log('用户按了允许授权按钮')
        // 存入缓存
        wx.setStorageSync('userinfo', userInfo.mp.detail.userInfo)
        // wx.setStorageSync('userInfo', userRes.data.data)
        // 读取缓存
        this.userinfo = wx.getStorageSync('userinfo')
        console.log('userinfo', this.userinfo)
        console.log('data', userInfo)
        // console.log(userInfo.mp.detail.userInfo)
      } else {
        // 用户按了拒绝按钮
        console.log('用户按了拒绝按钮')
      }
    }
  }

```