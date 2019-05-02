let config = require('./config.default')
const proConfig = require('./config.pro')
let devConfig = require('./config.dev')

const env = process.env.NODE_ENV || 'development'
const isDev = !(env === 'production')

config.server = Object.assign(
  config.server,
  isDev ? devConfig.server : proConfig.server
)
config.blog = Object.assign(
  config.blog,
  isDev ? devConfig.blog : proConfig.blog
)
config.admin = Object.assign(
  config.admin,
  isDev ? devConfig.admin : proConfig.admin
)
// 去掉base末尾的斜杠,使用正则/\/+$/或/\/\/*$/均可
config.server.base = config.server.base.replace(/\/+$/, '')
config.blog.base = config.blog.base.replace(/\/+$/, '')
config.admin.base = config.admin.base.replace(/\/+$/, '')

module.exports = config
