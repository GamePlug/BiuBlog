const db = require('../models')
const {markdown} = require('common')

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

  checkParamsNotInt: function (ctx, params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const param = params[key]
        if (!param) {
          this.setBodyError(ctx, `Param ${key} is empty`)
          return true
        }
        if (!param.match(/^-?[1-9]\d*$/)) {
          this.setBodyError(ctx, `Param ${key} is not Integer`)
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
        if (!param) {
          this.setBodyError(ctx, `Param ${key} is empty`)
          return true
        }
        if (!param.match(/^[0-9a-fA-F]{24}$/)) {
          this.setBodyError(ctx, `Param ${key} is not ObjectId`)
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

  getBlogBody: function (item, isContent) {
    return {
      id: item._id,
      title: item.title,
      subtitle: item.subtitle,
      content: isContent ? markdown.render(item.content) : '',
      date: item.date,
      type: item.type ? this.getBlogTypeBody(item.type) : null
    }
  }
}

module.exports = util
