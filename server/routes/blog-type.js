const Router = require('koa-router')
const db = require('../models')
const util = require('../lib/util')

const router = new Router()
router.prefix('/blog/type')

// 新增或修改博客类型
router.all('/save', async ctx => {
  const {id, name, sort} = util.getParams(ctx)
  if (util.checkParamsNotId(ctx, {id})) return
  if (util.checkParamsNotInt(ctx, {sort})) return
  if (!id) {
    // 没有id表示新增
    if (util.checkParamsIsEmpty(ctx, {name})) return
    const type = {name}
    if (sort) type.sort = sort
    const item = await new db.BlogType(type).save()
    util.setBodySuccess(ctx, util.getBlogTypeBody(item))
  } else {
    // 有id表示修改
    const type = {}
    if (name) type.name = name
    if (sort) type.sort = sort
    if (Object.keys(type).length === 0) {
      util.setBodyError(ctx, '缺少要修改的参数')
      return
    }
    const item = await db.BlogType.findOneAndUpdate({_id: id}, type, {new: true})
    if (!item) {
      util.setBodyError(ctx, '该博客类型不存在')
      return
    }
    util.setBodySuccess(ctx, util.getBlogTypeBody(item))
  }
})

// 删除博客类型
router.all('/delete', async ctx => {
  const {id} = util.getParams(ctx)
  if (util.checkParamsIsEmpty(ctx, {id})) return
  if (util.checkParamsNotId(ctx, {id})) return
  const item = await db.BlogType.findOneAndDelete({_id: id})
  if (!item) {
    util.setBodyError(ctx, '该博客类型不存在')
    return
  }
  util.setBodySuccess(ctx, util.getBlogTypeBody(item))
})

// 获取博客类型列表
router.all('/list', async ctx => {
  const list = await db.BlogType.find({}).sort({sort: 1})
  util.setBodySuccess(ctx, list.map((item) => {
    return util.getBlogTypeBody(item)
  }))
})

module.exports = router
