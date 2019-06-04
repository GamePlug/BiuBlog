const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 博客类型
const BlogType = mongoose.model('BlogType', new Schema({
  name: String,// 名称
  sort: {type: Number, default: 0}// 排序(从小到大)
}))

// 博客
const Blog = mongoose.model('Blog', new Schema({
  title: String,// 标题
  subtitle: String,// 副标题
  content: String,// 内容(markdown格式)
  type: {type: Schema.ObjectId, ref: BlogType.modelName},// 类型(BlogType的_id)
  date: {type: String, default: Date.now},// 日期
  status: {type: Number, default: 0},// 状态(0草稿箱中,1已发表,2回收站中)
  top: {type: Number, default: 0}// 置顶(0置顶,1不置顶)
}))

module.exports = {
  BlogType,
  Blog
}
