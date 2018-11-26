<template>
  <div class="container">
    <div class="userinfo">
      <img :src="userInfo.avatarUrl"/>
      <p class="other">{{userInfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button
      v-if="userInfo.city"
      @click="scanBook"
      class="btn">添加图书</button>
    <button 
      v-else 
      open-type="getUserInfo" 
      lang="zh_CN" 
      class='btn' 
      @getuserinfo="getUserInfo">点击登录</button>
  </div>
</template>

<script>
import YearProgress from '@/components/YearProgress'
import { post, showModal } from '../../utils'
import qcloud from 'wafer2-client-sdk'
import config from '../../config.js'

export default {
  data () {
    return {
      userInfo: {
        // 设置默认[没有登录的]头像
        avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
        nickName: '未登录'
      }
    }
  },
  components: {
    YearProgress
  },
  methods: {
    async addBook (isbn) {
      console.log('isbn', isbn)
      const res = await post('/weapp/addbook', {
        isbn,
        openid: this.userInfo.openId
      })
      showModal('添加成功', `${res.title}添加成功`)
      // console.log('res', res)
      console.log('res.data.title', res.data.title)
      // if (res.code === 0 && res.data.title) {
      //   showSuccess('添加成功', `${res.data.title}添加成功`)
      // }
    },
    scanBook: function () {
      wx.scanCode({
        success: (res) => {
          this.addBook(res.result)
          // console.log(res)
        }
      })
    },
    login () {
      console.log('触发')
      qcloud.setLoginUrl(config.loginUrl)
      const session = qcloud.Session.get()
      console.log('session', session)
      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            this.setData({ userInfo: res, logged: true })
            console.log('res', res)
          },
          fail: err => {
            console.error('222', err)
          }
        })
      } else {
        // 首次登录
        qcloud.login({
          success: res => {
            this.setData({ userInfo: res, logged: true })
            // console.log('res', res)
          },
          fail: err => {
            console.log(err)
          }
        })
      }
    },
    getUserInfo (e) {
      console.log('e.mp.detail.userInfo', e.mp.detail.userInfo)
      // 写入缓存
      wx.setStorageSync('userInfo', e.mp.detail.userInfo)
      // 拿取数据
      this.userInfo = e.mp.detail.userInfo
    }
  },
  onShow () {
    wx.showShareMenu()
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
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
