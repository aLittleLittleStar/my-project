/*
* @Author: Star
* @Date:   2018-11-17 16:26:26
* @Last Modified by:   Star
* @Last Modified time: 2018-11-23 19:47:44
*/
// 配置项
// 本地服务器
/* 开发环境部署 */
const host = 'http://localhost:5757'
/* 上线环境部署 */
// const host = 'https://qod21e5e.qcloud.la'
const config = {
  host,
  loginUrl: `${host}/weapp/login`,
  userUrl: `${host}/weapp/user`
}

export default config
