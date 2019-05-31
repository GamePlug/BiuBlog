var hljs = require('highlight.js')

const markdown = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {
      }
    }
    return ''
  }
})

module.exports = markdown
