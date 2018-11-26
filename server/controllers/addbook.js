/*
* @Author: Star
* @Date:   2018-11-23 16:54:48
* @Last Modified by:   Star
* @Last Modified time: 2018-11-26 16:57:45
*/

const https = require('https')
const {mysql} = require('../qcloud')
// 新增图书
// 1.获取豆瓣信息
// https://developers.douban.com/wiki/?title=book_v2#get_isbn_book
// https://api.douban.com/v2/book/isbn/9787536692930
// 2.入库
module.exports = async (ctx) => {
  // const { isbn } = ctx.request.body
  const { isbn } = ctx.request.body
  console.log("添加图书", isbn )
  if (isbn) {
    // 添加查询功能 
    const findRes = await mysql('books').select().where('isbn', isbn)
    // 如果图书已经存在，返回-1
    if (findRes.length) {
      ctx.state = {
        code: -1,
        data: {
          msg: '图书已存在'
        }
      }
      // 返回，防止执行以下的代码
      return 
    }

    let url = 'https://api.douban.com/v2/book/isbn/' + isbn
    console.log('url', url)
    const bookinfo = await getJSNO(url)
    const rate = bookinfo.rating.average
    const { title, image, alt, publisher, summary, price} = bookinfo
    const tags = bookinfo.tags.map (v => {
      return `${v.title} ${v.count}`
    }).join(',')
    const author = bookinfo.author.join(',')
    // console.log('bookinfo', bookinfo)
    console.log(isbn, rate, title, image, alt, publisher, summary, price, tags, author)
    try {
      await mysql('books').insert({
        isbn, rate, title, image, alt, publisher, summary, price, tags, author
      })
      ctx.state.data = {
        title,
        msg: 'success'
      }
    } catch (e) {
      ctx.state = {
        code: -1,
        data: {
          msg: '新增失败' + e.sqlMessage
        }
      }
    }
  }
}
// module.exports = async (ctx) => {
//   const { isbn, openid} = ctx.request.body
//   console.log("hola datevid", isbn, openid)
//   if (isbn && openid) {
//     let url = 'https://api.douban.com/v2/book/isbn/' + isbn
//     console.log('url', url)
//     const bookinfo = await getJSNO(url)
//     const rate = bookinfo.rating.average
//     const { title, image, alt, publisher, summary, price} = bookinfo
//     const tags = bookinfo.tags.map (v => {
//       return `${v.title} ${v.count}`
//     }).join(',')
//     const author = bookinfo.author.join(',')
//     try {
//       await mysql('books').insert({
//         isbn, openid, rate, title, image, alt, publisher, summary, price, tags
//       })
//       ctx.state.data = {
//         title,
//         msg: 'success'
//       }
//     } catch (e) {
//       ctx.state = {
//         code: -1,
//         data: {
//           msg: '新增失败' + e.sqlMessage
//         }
//       }
//     }
//     console.log({
//       rate, title, image, alt, publisher, summary, price, tags, author
//     })
//   }
// }

function getJSNO (url) {
  return new Promise((reslove, reject) => {
    https.get(url, res => {
      let urlData = ''
      res.on('data', data => {
        urlData += data
      })
      res.on('end', data=> {
        const bookinfo = JSON.parse(urlData)
        if (bookinfo.title) {
        	reslove(bookinfo)
        }
        reject(bookinfo)
    })
  })
})
}
