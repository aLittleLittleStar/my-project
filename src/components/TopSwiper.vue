<template>
  <div class="swiper">
    <swiper
      indicator-color='#EA5A49'
      :indicator-dots='true'
      :autoplay='true'
      :interval='6000'
      :duration='1000'
      :circular='true'>
        <div
          :key='imgindex'
          v-for='(top, imgindex) in imgUrls'>
          <swiper-item>
            <img 
              class='slide-image'
              mode='aspectFit'
              v-for='img in top'
              :key='img.id'
              :src="img.image"
              @click='bookDetail(img)' 
              alt="">
          </swiper-item>
        </div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: ['tops'],
  computed: {
    imgUrls () {
      /* 如果通用 请用 chunk 函数比如 lodash 的 chunk 方法 */
      /* Chunk convers arrays like [1,2,3,4,5]into arrays of arrays like[[1,2],[3,4],[5]] */
      let res = this.tops
      // 对图片进行切割一行显示三个
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6)]
    }
  },
  methods: {
    bookDetail (item) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + item.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  margin: 10rpx 0 0 0;
  .slide-image {
    width: 33%;
    height: 250rpx;
  }
}
</style>
