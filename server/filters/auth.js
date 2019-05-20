const Filter = require('../lib/filter')
const util = require('../lib/util')

const filter = new Filter()
filter.prefix('')

// 签名验证
filter.match('', [], ctx => {
  const {headers: {_sign}} = ctx.request
  if (_sign !== 'chenqiaojun') {
    util.setBody(ctx, 2, 'Signature failed')
    return true
  }
})

// 登录验证
filter.match('', [
  '/blog/type/list',
  '/blog/list',
  '/blog/one'
], ctx => {
  const {headers: {_author, _sign}} = ctx.request
  if (_author !== 'leichao' || _sign !== 'chenqiaojun') {
    util.setBody(ctx, 3, 'Not logged')
    return true
  }
})

module.exports = filter
