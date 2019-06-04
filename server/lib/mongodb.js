const mongoose = require('mongoose')

const mongodb = {
  connect: function (uri) {
    const options = {
      useNewUrlParser: true,
      useFindAndModify: false
    }
    mongoose.connect(uri, options).then(
      () => {
        console.log('connected to mongoDB')
      },
      err => {
        console.log(err.stack)
      }
    )
  }
}

module.exports = mongodb
