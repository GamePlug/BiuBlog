const Router = require('koa-router')
const db = require('../models')
const util = require('../lib/util')

const router = new Router()
router.prefix('/blog')

// 新增或修改博客
router.all('/save', async ctx => {
  const {id, title, subtitle, content, type, date, status, top} = util.getParams(ctx)
  if (util.checkParamsNotId(ctx, {id, type})) return
  if (util.checkParamsOutRange(ctx, {status}, [0, 1, 2])) return
  if (util.checkParamsOutRange(ctx, {top}, [0, 1])) return
  if (type && !await db.BlogType.findOne({_id: type})) {
    util.setBodyError(ctx, '博客类型不存在')
    return
  }
  if (!id) {
    // 没有id表示新增
    if (util.checkParamsIsEmpty(ctx, {title, subtitle, content, type})) return
    const blog = {title, subtitle, content, type}
    if (!util.isEmpty(date)) blog.date = date
    if (!util.isEmpty(status)) blog.status = status
    if (!util.isEmpty(top)) blog.top = top
    const save = await new db.Blog(blog).save()
    const item = await db.Blog.findOne({_id: save._id}).populate(util.populateBlogType())
    util.setBodySuccess(ctx, util.getBlogBody(item))
  } else {
    // 有id表示修改
    const blog = {}
    if (!util.isEmpty(title)) blog.title = title
    if (!util.isEmpty(subtitle)) blog.subtitle = subtitle
    if (!util.isEmpty(content)) blog.content = content
    if (!util.isEmpty(type)) blog.type = type
    if (!util.isEmpty(date)) blog.date = date
    if (!util.isEmpty(status)) blog.status = status
    if (!util.isEmpty(top)) blog.top = top
    if (Object.keys(blog).length === 0) {
      util.setBodyError(ctx, '缺少要修改的参数')
      return
    }
    if (title || subtitle || content) {
      blog.$inc = {__v: 1}// 修改了title或subtitle或content,版本才+1
    }
    const item = await db.Blog.findOneAndUpdate({_id: id}, blog, {new: true}).populate(util.populateBlogType())
    if (!item) {
      util.setBodyError(ctx, '该博客不存在')
      return
    }
    util.setBodySuccess(ctx, util.getBlogBody(item))
  }
})

// 删除博客
router.all('/delete', async ctx => {
  const {id} = util.getParams(ctx)
  if (util.checkParamsIsEmpty(ctx, {id})) return
  if (util.checkParamsNotId(ctx, {id})) return
  const item = await db.Blog.findOneAndDelete({_id: id}).populate(util.populateBlogType())
  if (!item) {
    util.setBodyError(ctx, '该博客不存在')
    return
  }
  util.setBodySuccess(ctx, util.getBlogBody(item))
})

// 获取博客列表
router.all('/list', async ctx => {
  const {type, status, page, size} = util.getParams(ctx)
  if (util.checkParamsNotId(ctx, {type})) return
  if (util.checkParamsOutRange(ctx, {status}, [0, 1, 2])) return
  const _page = parseInt(page) > 0 ? parseInt(page) : 1
  const _size = parseInt(size) > 0 ? parseInt(size) : 10
  const condition = {}
  if (!util.isEmpty(type)) condition.type = type
  if (!util.isEmpty(status)) condition.status = status
  const list = await db.Blog.find(condition).populate(util.populateBlogType())
    .skip((_page - 1) * _size).limit(_size).sort({top: -1, date: -1})
  util.setBodySuccess(ctx, list.map((item) => {
    return util.getBlogBody(item)
  }))
})

// 获取博客
router.all('/one', async ctx => {
  const {id, mode} = util.getParams(ctx)
  if (util.checkParamsIsEmpty(ctx, {id})) return
  if (util.checkParamsNotId(ctx, {id})) return
  if (util.checkParamsOutRange(ctx, {mode}, ['view', 'edit'])) return
  const item = await db.Blog.findOne({_id: id}).populate(util.populateBlogType())
  if (!item) {
    util.setBodyError(ctx, '该博客不存在')
    return
  }
  util.setBodySuccess(ctx, util.getBlogBody(item, mode || 'view'))
})

module.exports = router
