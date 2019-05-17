const filter = require('../lib/filter')
const util = require('../lib/util')

const pass = [
  '/blog/type/list',
  '/blog/list',
  '/blog/one'
]

module.exports = filter('', pass, ctx => {
  const {headers: {_author, _sign}} = ctx.request
  if (_author !== 'leichao' || _sign !== 'chenqiaojun') {
    util.setBody(ctx, 3, 'Not logged')
    return true
  }
})
