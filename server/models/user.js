const mongoose = require('mongoose')

const Schema = mongoose.Schema

//  用户对象模型
const User = new Schema({
  username: String,
  password: String,
  photo: String,
  type: String,
})

//  用户类型对象模型
const UserType = new Schema({
  name: String,
})

const user = {
  User: mongoose.model('User', User),
  UserType: mongoose.model('UserType', UserType),
}

module.exports = user
