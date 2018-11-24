<template>
  <div class="container">
    <div 
      class="userinfo" 
      @click='login'>
      <img  
        class="userinfo-avatar" 
        :src="userinfo.avatarUrl" 
        alt="">
      <p class="userinfo-nickname">{{userinfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button 
      v-if="userinfo.city" 
      @click='scanBook' 
      class='btn' >
      添加图书
    </button>
    <button 
      class='btn'
      v-else
      lang="zh_CN"
      open-type="getUserInfo" 
      @getuserinfo="bindGetUserInfo">点击登录</button>

  </div>
</template>

<script>
import YearProgress from '@/components/YearProgress'
import { showSuccess, post, showModal } from '../../utils'
import qcloud from 'wafer2-client-sdk'
import config from '../../config'

export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userinfo: {
        // 设置默认[没有登录的]头像
        avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
        nickName: '未登录'
      }
    }
  },
  /* 跳转到该页面就自动执行, onShow 是微信 API 的生命周期 */
  onShow () {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.userInfo = userInfo
    }
    // console.log(this.userInfo)
  },
  methods: {
    scanBook () {
      /* [scanCode](https://developers.weixin.qq.com/miniprogram/dev/api/device/scan/wx.scanCode.html) */
      wx.scanCode({
        success: res => {
          if (res.result) {
            // console.log(res)
            this.addBook(res.result)
          }
        }
      })
    },
    /* isbn: 书的编号 */
    /* 发请求, async 封装 */
    async addBook (isbn) {
      // console.log(isbn)
      /* 传递给 server/controllers/addbook.js */
      const res = await post('/weapp/addbook', {
        isbn,
        openid: this.userInfo.openId
      })
      showModal('添加成功', `${res.title}添加成功`)
    },
    doLogin () {
      /* [qcloud 获取用户信息 wafer2-client-sdk](https://github.com/tencentyun/wafer-client-sdk/) */
      /* [getStorageSync 获取缓存数据](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorageSync.html) */
      let user = wx.getStorageSync('userInfo')
      if (!user) {
        if (user) {
          // 第二次登录
          // 或者本地已经有登录态
          // 可使用本函数更新登录态
          qcloud.loginWithCode({
            success: res => {
              qcloud.request({
                /* 想要使用 optionId 要请求 server/routes/index.js/用户信息接口 */
                url: config.userUrl,
                login: true,
                success: userRes => {
                  console.log(userRes)
                  /* [setStorageSync 数据缓存](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html) */
                  wx.setStorageSync('userInfo', userRes.data.data)
                  this.userInfo = userRes.data.data
                  showSuccess('登录成功')
                }
              })
            },
            fail: err => {
              console.log('第二次登录失败', err)
            }
          })
        } else {
          // 首次登录
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.login({
            success: res => {
              qcloud.request({
                /* 想要使用 optionId 要请求 server/routes/index.js/用户信息接口 */
                url: config.userUrl,
                login: true,
                success: userRes => {
                  console.log(userRes)
                  /* [setStorageSync 数据缓存](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html) */
                  wx.setStorageSync('userInfo', userRes.data.data)
                  this.userInfo = userRes.data.data
                  showSuccess('登录成功')
                }
              })
            },
            fail: err => {
              console.log('登录失败', err)
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
.container{
  padding:0 30rpx;
}  
.userinfo{
  margin-top:100rpx;
  text-align:center;
  img{
    width: 150rpx;
    height:150rpx;
    margin: 20rpx;
    border-radius: 50%;
  }
}

</style>
