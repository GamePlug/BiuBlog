const db = require('../models')
const markdown = require('common/markdown')

const util = {
  getParams: function (ctx) {
    return "GET" === ctx.request.method ? ctx.request.query : ctx.request.body
  },

  checkParamsIsEmpty: function (ctx, params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const param = params[key]
        if (!param) {
          this.setBodyError(ctx, `Param ${key} is empty`)
          return true
        }
      }
    }
    return false
  },

  checkParamsNotId: function (ctx, params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const param = params[key]
        if (param && !param.match(/^[0-9a-fA-F]{24}$/)) {
          this.setBodyError(ctx, `Param ${key} is not ObjectId`)
          return true
        }
      }
    }
    return false
  },

  checkParamsNotInt: function (ctx, params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const param = params[key]
        if (param && !param.match(/^-?[1-9]\d*$/)) {
          this.setBodyError(ctx, `Param ${key} is not Integer`)
          return true
        }
      }
    }
    return false
  },

  checkParamsOutRange: function (ctx, params, ranges) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const param = params[key]
        if (param && !ranges.find(range => range === param)) {
          this.setBodyError(ctx, `Param ${key} is out range [${ranges}]`)
          return true
        }
      }
    }
    return false
  },

  setBody: function (ctx, err, message, result) {
    ctx.body = {err: err || 0, message: message || 'success', result: result || {}}
  },

  setBodySuccess: function (ctx, result) {
    this.setBody(ctx, 0, 'success', result)
  },

  setBodyError: function (ctx, message) {
    this.setBody(ctx, 1, message, {})
  },

  populateBlogType: function () {
    return {
      path: 'type',
      select: '_id name sort',
      model: db.BlogType.modelName
    }
  },

  getBlogTypeBody: function (item) {
    return {
      id: item._id,
      name: item.name,
      sort: item.sort
    }
  },

  getBlogBody: function (item, mode) {
    let content = ''
    if (mode === 'view') {
      content = markdown.render(item.content)
    } else if (mode === 'edit') {
      content = item.content
    }
    return {
      id: item._id,
      version: item.__v,
      title: item.title,
      subtitle: item.subtitle,
      content: content,
      type: item.type ? this.getBlogTypeBody(item.type) : null,
      date: item.date,
      status: item.status,
      top: item.top
    }
  }
}

module.exports = util
