<script>
// import { get } from './utils'
// import qcloud from 'wafer2-client-sdk'
// import config from './config'
// var qcloud = require('./node_modules/wafer2-client-sdk/index.js')

export default {
//   mounted () {
//     // 一进来看看用户是否授权过
//     this.getSetting()
//   },
//   methods: {
//     scanBook: function () {},
//     getSetting () {
//       wx.getSetting({
//         success: function (res) {
//           if (res.authSetting['scope.userInfo']) {
//             wx.getUserInfo({
//               success: function (res) {
//                 console.log(res.userInfo)
//                 // 用户已经授权过
//                 console.log('用户已经授权过')
//                 console.log(res.userInfo.nickName)
//                 console.log(res.userInfo.avatarUrl)
//               }
//             })
//           } else {
//             console.log('用户还未授权过')
//           }
//         }
//       })
//     },
//     getUserInfo1 () {
//       console.log('click事件首先触发')
//       // 判断小程序的API，回调，参数，组件等是否在当前版本可用。
//       // 为false 提醒用户升级微信版本
//       // console.log(wx.canIUse('button.open-type.getUserInfo'))
//       if (wx.canIUse('button.open-type.getUserInfo')) {
//         // 用户版本可用
//       } else {
//         console.log('请升级微信版本')
//       }
//     },
//     bindGetUserInfo (e) {
//       // console.log(e.mp.detail.rawData)
//       if (e.mp.detail.rawData) {
//         // 用户按了允许授权按钮
//         console.log('用户按了允许授权按钮')
//       } else {
//         // 用户按了拒绝按钮
//         console.log('用户按了拒绝按钮')
//       }
//     }
//   }
}
</script>

<style>
.text-footer {
  text-align: center;
  font-size: 12px;
  margin-bottom: 5px;
}
.text-primary {
  color: #EA5149;
}
.btn{
  color: white;
  background: #48D1CC;
  /* margin-left: 20px; */
  margin-top: 150rpx;
  border-radius: 8rpx;
  font-size: 32rpx;
  line-height: 80rpx;
  height: 80rpx;
  width: 50%;
}
.btn:active{
  background: #94dbea;
}
</style>
