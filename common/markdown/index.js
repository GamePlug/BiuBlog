const build = require('./build')
const markdown = build(require('markdown-it'), require('highlight.js'))

module.exports = markdown
