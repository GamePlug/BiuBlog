const myConfig = require('../../config')

module.exports = function (match, pass, fn) {
  return async function (ctx, next) {
    const {URL: {pathname}} = ctx.request
    let isPass = false
    for (let i = 0; i < pass.length; i++) {
      const curPath = myConfig.server.base + match + pass[i]
      if (curPath === pathname) {
        isPass = true
        break
      }
    }
    if (isPass || !fn(ctx)) {
      await next()
    }
  }
}
