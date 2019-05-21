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
  return async (ctx, next) => {
    let index = 0
    let filterNext = () => {
      index++
    }
    const {URL: {pathname}} = ctx.request
    for (let i = 0; i < stack.length; i++) {
      if (index !== i) break
      const match = stack[i]
      let isMatch = false
      if (pathname.startsWith(prefix + match.path)) {
        isMatch = true
        for (let i = 0; i < match.pass.length; i++) {
          if (pathname === prefix + match.path + match.pass[i]) {
            isMatch = false
            break
          }
        }
      }
      const thatNext = index === stack.length - 1 ? next : filterNext
      isMatch ? await match.fn(ctx, thatNext) : await thatNext()
    }
  }
}

module.exports = Filter
