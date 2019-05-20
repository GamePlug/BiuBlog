function Filter(opts) {
  if (!(this instanceof Filter)) {
    return new Filter(opts);
  }
  this.opts = opts || {};
  this.opts.prefix = this.opts.prefix || ''
  this.stack = []
}

Filter.prototype.prefix = function (prefix) {
  prefix = prefix.replace(/\/$/, '')
  this.opts.prefix = prefix + this.opts.prefix
}

Filter.prototype.match = function (path, pass, fn) {
  const match = {}
  match.path = path || ''
  match.pass = pass || []
  match.fn = fn
  this.stack.push(match)
}

Filter.prototype.filters = function () {
  const stack = this.stack
  const prefix = this.opts.prefix
  return async function (ctx, next) {
    const {URL: {pathname}} = ctx.request
    for (let i = 0; i < stack.length; i++) {
      const match = stack[i]
      let isVerify = false
      if (pathname.startsWith(prefix + match.path)) {
        isVerify = true
        for (let i = 0; i < match.pass.length; i++) {
          const curPath = prefix + match.path + match.pass[i]
          if (curPath === pathname) {
            isVerify = false
            break
          }
        }
        if (isVerify && match.fn(ctx)) {
          return
        }
      }
    }
    await next()
  }
}

module.exports = Filter
