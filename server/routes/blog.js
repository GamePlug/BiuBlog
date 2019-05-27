const Router = require('koa-router')
const db = require('../models')
const util = require('../lib/util')

const router = new Router()
router.prefix('/blog')

// 新增博客类型
router.all('/type/add', async ctx => {
  const {name, sort} = util.getParams(ctx)
  if (util.checkParamsIsEmpty(ctx, {name})) return
  const type = {name, sort}
  const item = await new db.BlogType(type).save()
  util.setBodySuccess(ctx, util.getBlogTypeBody(item))
})

// 删除博客类型
router.all('/type/delete', async ctx => {
  const {id} = util.getParams(ctx)
  if (util.checkParamsNotId(ctx, {id})) return
  const result = await db.BlogType.deleteOne({_id: id})
  if (result.deletedCount === 0) {
    util.setBodyError(ctx, '该博客类型不存在')
    return
  }
  util.setBodySuccess(ctx, {})
})

// 修改博客类型
router.all('/type/update', async ctx => {
  const {id, name, sort} = util.getParams(ctx)
  if (util.checkParamsNotId(ctx, {id})) return
  const type = {}
  if (name) type.name = name
  if (sort) {
    if (util.checkParamsNotInt(ctx, {sort})) return
    type.sort = sort
  }
  if (Object.keys(type).length === 0) {
    util.setBodyError(ctx, '缺少要修改的参数')
    return
  }
  const result = await db.BlogType.updateOne({_id: id}, type)
  if (result.n === 0) {
    util.setBodyError(ctx, '该博客类型不存在')
    return
  }
  util.setBodySuccess(ctx, {})
})

// 获取博客类型列表
router.all('/type/list', async ctx => {
  const list = await db.BlogType.find({}).sort({sort: 1})
  util.setBodySuccess(ctx, list.map((item) => {
    return util.getBlogTypeBody(item)
  }))
})

// 新增博客
router.all('/add', async ctx => {
  const {title, subtitle, content, date, type} = util.getParams(ctx)
  if (util.checkParamsIsEmpty(ctx, {title, subtitle, content})) return
  if (util.checkParamsNotId(ctx, {type})) return
  if (!await db.BlogType.findOne({_id: type})) {
    util.setBodyError(ctx, '博客类型不存在')
    return
  }
  const blog = {title, subtitle, content, date, type}
  const save = await new db.Blog(blog).save()
  const item = await db.Blog.findOne({_id: save._id}).populate(util.populateBlogType())
  util.setBodySuccess(ctx, util.getBlogBody(item))
})

// 删除博客
router.all('/delete', async ctx => {
  const {id} = util.getParams(ctx)
  if (util.checkParamsNotId(ctx, {id})) return
  const item = await db.Blog.findOne({_id: id}).populate(util.populateBlogType())
  if (!item) {
    util.setBodyError(ctx, '该博客不存在')
    return
  }
  const result = await db.Blog.deleteOne({_id: id})
  if (result.deletedCount === 0) {
    util.setBodyError(ctx, '该博客不存在')
    return
  }
  util.setBodySuccess(ctx, util.getBlogBody(item))
})

// 修改博客
router.all('/update', async ctx => {
  const {id, title, subtitle, content, date, type} = util.getParams(ctx)
  if (util.checkParamsNotId(ctx, {id})) return
  const blog = {}
  if (title) blog.title = title
  if (subtitle) blog.subtitle = subtitle
  if (content) blog.content = content
  if (date) blog.date = date
  if (type) {
    if (!await db.BlogType.findOne({_id: type})) {
      util.setBodyError(ctx, '博客类型不存在')
      return
    }
    blog.type = type
  }
  if (Object.keys(blog).length === 0) {
    util.setBodyError(ctx, '缺少要修改的参数')
    return
  }
  const result = await db.Blog.updateOne({_id: id}, blog)
  if (result.n === 0) {
    util.setBodyError(ctx, '该博客不存在')
    return
  }
  const item = await db.Blog.findOne({_id: id}).populate(util.populateBlogType())
  if (!item) {
    util.setBodyError(ctx, '该博客不存在')
    return
  }
  util.setBodySuccess(ctx, util.getBlogBody(item))
})

// 获取博客列表
router.all('/list', async ctx => {
  const {type} = util.getParams(ctx)
  const condition = {}
  if (type) {
    if (util.checkParamsNotId(ctx, {type})) return
    condition.type = type
  }
  const list = await db.Blog.find(condition).populate(util.populateBlogType()).sort({date: -1})
  util.setBodySuccess(ctx, list.map((item) => {
    return util.getBlogBody(item)
  }))
})

// 获取博客
router.all('/one', async ctx => {
  const {id} = util.getParams(ctx)
  if (util.checkParamsNotId(ctx, {id})) return
  const item = await db.Blog.findOne({_id: id}).populate(util.populateBlogType())
  if (!item) {
    util.setBodyError(ctx, '该博客不存在')
    return
  }
  util.setBodySuccess(ctx, util.getBlogBody(item, true))
})

module.exports = router
