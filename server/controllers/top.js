/*
* @Author: Star
* @Date:   2018-12-04 20:43:16
* @Last Modified by:   Star
* @Last Modified time: 2018-12-04 20:51:53
*/
// 定义导航条
const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
	const top = await mysql('books')
             .select('id', 'title','image', 'count')
             .orderBy('count', 'desc')
             .limit(9)

  ctx.state.data = {
    list: top
  }
}