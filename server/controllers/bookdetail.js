/*
* @Author: Star
* @Date:   2018-12-04 20:09:36
* @Last Modified by:   Star
* @Last Modified time: 2018-12-04 20:43:59
*/
// 统计每一个图书的访问量
const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
	const { id } = ctx.request.query
  await mysql('books').where('id', id)
                      .increment('count', 1)
}