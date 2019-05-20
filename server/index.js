const Koa = require('koa')
const koaBody = require('koa-body')
const myConfig = require('../config')

const app = new Koa()

async function start() {
  // Error catch
  app.use(async (ctx, next) => {
    try {
      await next()
      if (ctx.status === 404) {
        ctx.throw(404)
      }
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500
      ctx.body = `Status:${ctx.status}\nUrl:${ctx.request.url}\n${err.stack}`
      console.log(ctx.body)
    }
  })

  // Add koa-body
  app.use(koaBody({
    multipart: true,
    formidable: {
      uploadDir: '../../upload/',
      keepExtensions: true,
      maxFieldsSize: 5 * 1024 * 1024
    }
  }))

  // Add filters
  const filters = require('./filters')
  filters.forEach(filter => {
    filter.prefix(myConfig.server.base)
    app.use(filter.filters())
  })

  // Add routes
  const routes = require('./routes')
  routes.forEach(router => {
    router.prefix(myConfig.server.base)
    app.use(router.routes())
  })

  const host = myConfig.server.host
  const port = myConfig.server.port
  app.listen(port, host)
  console.log(`Server listening on http://${host}:${port}`)
}

start()
