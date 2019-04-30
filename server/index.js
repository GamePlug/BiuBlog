const Koa = require('koa')
const bodyparser = require('koa-bodyparser')

const app = new Koa()

async function start() {
  // Error catch
  app.use(async (ctx, next) => {
    try {
      await next()
      if (ctx.status === 404) {
        ctx.throw(404);
      }
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500
      ctx.body = `Status:${ctx.status}\nUrl:${ctx.request.url}\n${err.stack}`
      console.log(ctx.body)
    }
  })

  // Add bodyparser
  app.use(bodyparser({enableTypes: ['json', 'form', 'text']}))

  // Add routes
  const routes = require('./routes')
  for (let i = 0; i < routes.length; i++) {
    const router = routes[i]
    router.prefix('/api')
    app.use(router.routes())
  }

  const host = '0.0.0.0'
  const port = 3001
  app.listen(port, host)
  console.log(`Server listening on http://${host}:${port}`)
}

start()
