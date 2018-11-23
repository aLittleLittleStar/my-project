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


  // async created () {
    // qcloud.setLoginUrl(config.loginUrl)
    // qcloud.login({
    //   success: function (userInfo) {
    //     console.log('登录成功', userInfo)
    //     wx.setStorageSync('userInfo', userInfo)
    //   },
    //   fail: function (err) {
    //     console.log('登录失败', err)
    //   }
    // })
    // const res = await get('/weapp/demo')
    // console.log(123, res)
    // wx.request({
    //   url: config.host + '/weapp/demo',
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
  // console.log('小程序启动了')
  // }

    // mounted () {
  //   // 一进来看看用户是否授权过
  //   this.getSetting()
  // },
  // methods: {
  //   scanBook: function () {},
  //   getSetting () {
  //     wx.getSetting({
  //       success: function (res) {
  //         if (res.authSetting['scope.userInfo']) {
  //           wx.getUserInfo({
  //             success: function (res) {
  //               console.log(res.userInfo)
  //               // 用户已经授权过
  //               console.log('用户已经授权过')
  //             }
  //           })
  //         } else {
  //           console.log('用户还未授权过')
  //         }
  //       }
  //     })
  //   },
  //   getUserInfo1 () {
  //     console.log('click事件首先触发')
  //     // 判断小程序的API，回调，参数，组件等是否在当前版本可用。
  //     // 为false 提醒用户升级微信版本
  //     // console.log(wx.canIUse('button.open-type.getUserInfo'))
  //     if (wx.canIUse('button.open-type.getUserInfo')) {
  //       // 用户版本可用
  //     } else {
  //       console.log('请升级微信版本')
  //     }
  //   },
  //   bindGetUserInfo (e) {
  //     // console.log(e.mp.detail.rawData)
  //     if (e.mp.detail.rawData) {
  //       // 用户按了允许授权按钮
  //       console.log('用户按了允许授权按钮')
  //     } else {
  //       // 用户按了拒绝按钮
  //       console.log('用户按了拒绝按钮')
  //     }
  //   }
  // }




    mounted () {
    // 一进来看看用户是否授权过
    this.getSetting()
  },
  methods: {
    getSetting () {
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo)
                // 用户已经授权过
                console.log('用户已经授权过')
                // 写入缓存
                wx.setStorageSync('userInfo', res.userInfo)
                this.userMessage = wx.getStorageSync('userInfo')
                console.log(res.userInfo.nickName)
                console.log(res.userInfo.avatarUrl)
              }
            })
          } else {
            console.log('用户还未授权过')
            wx.setStorageSync('userInfo', res.userInfo)
            console.log(res.userInfo)
            // this.userMessage = wx.getStorageSync('userInfo')
          }
        }
      })
    },
    login () {
      let user = wx.getStorageSync('userInfo')
      console.log('click事件首先触发')
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。
      // 为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if (wx.canIUse('button.open-type.getUserInfo')) {
        // 用户版本可用
        console.log('用户版本可用')
      } else {
        console.log('请升级微信版本')
      }
    },
    bindGetUserInfo (res) {
      // console.log(e.mp.detail.rawData)
      if (res.mp.detail.rawData) {
        // 用户按了允许授权按钮
        console.log('用户按了允许授权按钮')
        showSuccess('登录成功')
        // wx.setStorageSync('userInfo', res.userInfo)
        // this.userMessage = wx.getStorageSync('userInfo')
      } else {
        // 用户按了拒绝按钮
        console.log('用户按了拒绝按钮')
      }
    },
    scanBook: function () {
      wx.scanCode({
        success: (res) => {
          console.log(res)
        }
      })
    }
  },
