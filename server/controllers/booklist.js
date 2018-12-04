/*
* @Author: Star
* @Date:   2018-11-27 18:53:11
* @Last Modified by:   Star
* @Last Modified time: 2018-12-04 14:30:50
*/
const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
	const { page } = ctx.request.query
	const size = 10
  const books = await mysql('books')
    .select('*')
    .limit(size)
    .offset(Number(page) * size)
    .orderBy('books.id', 'desc')
    // .select('books.*', 'cSessionInfo.user_info')
    // .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
    // .orderBy('books.id', 'desc')

  ctx.state.data = {
  	list: books
    // list: books.map (v => {
    //   const info = JSON.parse(v.user_info)
    //   return Object.assign({}, v, {
    //     user_info: {
    //       nickName: info.nickName
    //     }
    //   })
    // })
  }
}