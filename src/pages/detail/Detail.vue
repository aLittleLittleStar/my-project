<template>
  <div>图书id: {{bookid}}</div>
</template>

<script>
import { get } from '../../utils'
export default {
  data () {
    return {
      bookid: ''
    }
  },
  methods: {
    async getDetail () {
      const info = await get('/weapp/bookdetail', {
        id: this.bookid
      })
      return info
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
  }
}
</script>
