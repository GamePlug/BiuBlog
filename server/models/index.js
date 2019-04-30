const models = Object.assign(
  require('./user'),
  require('./blog')
)

const mongoose = require('mongoose')

const options = {
  useNewUrlParser: true,
}

mongoose.connect('mongodb://localhost:27017/blog', options).then(
  () => {
    console.log('connected to mongoDB')
  },
  err => {
    console.log(err.stack)
  }
)

module.exports = models
