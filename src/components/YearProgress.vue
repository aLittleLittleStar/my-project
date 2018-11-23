<template>
  <div class="progressbar">
    <progress 
      :percent="percent"
      activeColor='#EA5A49'></progress>
      <p>{{year}}已经过去了{{days}}天，{{percent}}%</p>
  </div>
</template>

<script>
export default {
  methods: {
    // 获取是否是闰年
    isLeapYear () {
      const year = new Date().getFullYear()
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    // 获取一年多少天
    getDayOfYear () {
      return this.isLeapYear() ? 366 : 365
    }
  },
  computed: {
    // 获取当前年份
    year () {
      return new Date().getFullYear()
    },
    days () {
      let start = new Date()
      // 设置月份
      start.setMonth(0)
      // 设置天数
      start.setDate(1)
      // start就是今年第一天
      // 今天的时间戳 减去今年第一天的时间戳
      let offset = new Date().getTime() - start.getTime()
      // 转化成整形 + 1
      return parseInt((offset / 1000 / 60 / 60 / 24)) + 1
    },
    percent () {
      // 转化为百分比，且小数点后面保留一位
      return (this.days * 100 / this.getDayOfYear()).toFixed(1)
    }
  }
}
</script>

<style lang="scss">
.progressbar{
	text-align: center;
	margin-top: 20rpx;
	margin-bottom: 80rpx;
  width: 100%;
  progress{
    margin-bottom: 20rpx;
  }
}
</style>
