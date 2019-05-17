const filter = require('../lib/filter')
const util = require('../lib/util')

const pass = []

module.exports = filter('', pass, ctx => {
  const {headers: {_sign}} = ctx.request
  if (_sign !== 'chenqiaojun') {
    util.setBody(ctx, 2, 'Signature failed')
    return true
  }
})
