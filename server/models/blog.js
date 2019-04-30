const mongoose = require('mongoose')

const Schema = mongoose.Schema

//  博客对象模型
const Blog = new Schema({
  title: String,
  content: String,
  type: String,
  data: { type: String, default: Date.now },
})

//  博客类型对象模型
const BlogType = new Schema({
  name: String,
})

const blog = {
  Blog: mongoose.model('Blog', Blog),
  BlogType: mongoose.model('BlogType', BlogType),
}

module.exports = blog
