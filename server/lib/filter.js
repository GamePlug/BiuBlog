// 参考https://blog.csdn.net/sinat_17775997/article/details/82898312
// 控制每一个拦截器层的类
class Layer {
  constructor(prefix, path, pass, cb) {
    this.prefix = prefix
    this.path = path
    this.pass = pass
    this.cb = cb
  }

  setPrefix(prefix) {
    this.prefix = prefix
  }

  match(path) {
    // 当前拦截器以path开头且过滤掉pass子路径则返回true，否则返回 false
    let isMatch = false
    if (path.startsWith(this.prefix + this.path)) {
      isMatch = true
      for (let i = 0; i < this.pass.length; i++) {
        if (path === this.prefix + this.path + this.pass[i]) {
          isMatch = false
          break
        }
      }
    }
    return isMatch
  }
}

// 拦截器的类
class Filter {
  constructor(opts) {
    this.opts = opts || {}
    this.opts.prefix = this.opts.prefix || ''
    // 存放每个拦截器对象的数组，{ path: /xxx, pass: ['/yyy'], cb: fn }
    this.layers = []
  }

  prefix(prefix) {
    prefix = prefix.replace(/\/$/, '')
    this.opts.prefix = prefix + this.opts.prefix
    this.layers.forEach(layer => {
      layer.setPrefix(this.opts.prefix);
    });
  }

  all(path, pass, cb) {
    // 将拦截器对象存入数组中
    this.layers.push(new Layer(this.opts.prefix, path, pass, cb))
  }

  async compose(ctx, next, handlers) {
    // 将匹配的拦截器函数串联执行
    async function dispatch(index) {
      // 如果当前 index 个数大于了存储拦截器对象的长度，则执行 Koa 的 next 方法
      if (index >= handlers.length) return await next()

      // 否则调用取出的拦截器对象的回调执行，并传入一个函数，在传入的函数中递归 dispatch(index + 1)
      // 目的是为了执行下一个拦截器对象上的回调函数
      await handlers[index].cb(ctx, () => dispatch(index + 1))
    }

    // 第一次执行拦截器对象的回调函数
    await dispatch(0)
  }

  filters() {
    return async (ctx, next) => { // 当前 next 是 Koa 自己的 next，即 Koa 其他的中间件
      // 筛选符合条件的拦截器
      let handlers = this.layers.filter(layer => layer.match(ctx.path))
      await this.compose(ctx, next, handlers)
    }
  }
}

module.exports = Filter
