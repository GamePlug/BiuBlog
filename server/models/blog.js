const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 博客类型
const BlogType = mongoose.model('BlogType', new Schema({
  name: String,
  sort: {type: Number, default: 0}
}))

// 博客
const Blog = mongoose.model('Blog', new Schema({
  title: String,
  content: String,
  date: {type: String, default: Date.now},
  type: {type: Schema.ObjectId, ref: BlogType.modelName}
}))

module.exports = {
  BlogType,
  Blog
}
