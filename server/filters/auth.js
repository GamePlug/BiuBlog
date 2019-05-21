const Filter = require('../lib/filter')
const util = require('../lib/util')

const filter = new Filter()
filter.prefix('')

// 签名验证
filter.match('', [], async (ctx, next) => {
  const {headers: {_sign}} = ctx.request
  if (_sign !== 'chenqiaojun') {
    util.setBody(ctx, 2, 'Signature failed')
    return
  }
  await next()
})

// 登录验证
filter.match('', [
  '/blog/type/list',
  '/blog/list',
  '/blog/one'
], async (ctx, next) => {
  const {headers: {_author, _sign}} = ctx.request
  if (_author !== 'leichao' || _sign !== 'chenqiaojun') {
    util.setBody(ctx, 3, 'Not logged')
    return
  }
  await next()
})

module.exports = filter
