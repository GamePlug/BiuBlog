const Router = require('koa-router')
const db = require('../models')

const router = new Router()
router.prefix('/user')

// 你好
router.get('/hello', async ctx => {
  ctx.body = {err: 0, message: '你好啊user'}
})

// 注册
router.get('/register', async ctx => {
  const {username, password} = ctx.request.query
  if (!username || !password) {
    ctx.body = {err: 1, message: '账号或密码为空'}
    return
  }
  const hasUser = await db.User.findOne({username})
  if (hasUser) {
    ctx.body = {err: 1, message: '该账号已被注册', user: hasUser}
    return
  }
  const user = {username, password}
  const saveUser = await new db.User(user).save()
  ctx.body = {err: 0, message: '注册成功', user: saveUser}
})

// 登录
router.get('/login', async ctx => {
  const {username, password} = ctx.request.query
  if (!username || !password) {
    ctx.body = {err: 1, message: '账号或密码为空'}
    return
  }
  await db.User.findOne({username}, (err, docs) => {
    if (err) {
      ctx.body = {err: 1, message: '数据库错误'}
    }
    if (!docs || docs.password !== password) {
      ctx.body = {err: 1, message: '账号或密码不正确', user: docs}
      return
    }
    ctx.body = {err: 0, message: '登录成功', user: docs}
  })
})

module.exports = router
