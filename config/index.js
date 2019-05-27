const config = require('./config.pro')
//const config = require('./config.dev')

const config_env = config.env || 'development'
const node_env = process.env.NODE_ENV || 'development'
console.log(`CONFIG_ENV is ${config_env}; NODE_ENV is ${node_env}`)

config.server = build(config.server)
config.client = build(config.client)
config.admin = build(config.admin)

function build(target) {
  let base = target.base
  if (base) {
    if (base.indexOf('/') !== -1) base = base.replace(/\/+/g, '/')// 所有连续斜杠只保留一个
    if (base.endsWith('/')) base = base.replace(/\/+$/, '')// 去掉末尾的所有斜杠
    if (base.length > 0 && !base.startsWith('/')) base = '/' + base// 以一个斜杠开始
    target.base = base
  }
  return target
}

module.exports = config
