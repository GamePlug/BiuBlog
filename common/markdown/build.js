const build = function (markdownit, hljs) {
  return markdownit({
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
}

module.exports = build
