const models = Object.assign(
  require('./user'),
  require('./blog')
)

const mongoose = require('mongoose')
const myConfig = require('../../config')

const options = {
  useNewUrlParser: true,
}

mongoose.connect(myConfig.server.mongodb, options).then(
  () => {
    console.log('connected to mongoDB')
  },
  err => {
    console.log(err.stack)
  }
)

module.exports = models
