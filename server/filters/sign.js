const util = require('../lib/util')

module.exports = function () {
  return async function bodyParser(ctx, next) {
    const {URL: {pathname}, headers: {_author, _sign}} = ctx.request
    if ('/api/blog/one' === pathname) {
      if (_author !== 'leichao' || _sign !== 'chenqiaojun') {
        util.setBody(ctx, 2, 'Signature failed')
        return
      }
    }
    await next()
  }
}
