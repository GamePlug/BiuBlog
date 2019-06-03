const build = require('./build')
const cdn = {
  build,
  script: [
    {src: 'https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.4.2/markdown-it.min.js'},
    {src: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/highlight.min.js'}
  ]
}

module.exports = cdn
