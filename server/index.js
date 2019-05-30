const Koa = require('koa')
const koaBody = require('koa-body')
const mongodb = require('./lib/mongodb')
const {config} = require('common')

const app = new Koa()

async function start() {
  // Connect mongodb
  mongodb.connect(config.server.mongodb)

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
    filter.prefix(config.server.base)
    app.use(filter.filters())
  })

  // Add routes
  const routes = require('./routes')
  routes.forEach(router => {
    router.prefix(config.server.base)
    app.use(router.routes())
  })

  // Start server
  const host = config.server.host
  const port = config.server.port
  app.listen(port, host)
  console.log(`Server listening on http://${host}:${port}`)
}

start()
