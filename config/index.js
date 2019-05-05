const config = require('./config.default')
const proConfig = require('./config.pro')
const devConfig = require('./config.dev')
const env = process.env.NODE_ENV || 'development'
const isDev = !(env === 'production')

console.log(`NODE_ENV is ${env}`)
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

config.server = build(config.server)
config.blog = build(config.blog)
config.admin = build(config.admin)

function build(target) {
  // 去掉base末尾的斜杠,使用正则/\/+$/或/\/\/*$/均可
  if (target.base.endsWith('/')) {
    target.base = target.base.replace(/\/+$/, '')
  }
  return target
}

module.exports = config
