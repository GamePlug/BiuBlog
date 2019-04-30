<template>
  <div class="layout">
    <div class="markdown-body" v-html="model"></div>
  </div>
</template>

<script>
  import markdown from '@/assets/lib/markdown.js'

  export default {
    head() {
      return {title: '博客'}
    },

    data() {
      return {
        model: ''
      }
    },

    asyncData({params, $axios}) {
      return $axios.post('blog/test', {
        aaa: 'aaa',
        bbb: 'bbb'
      }).then((res) => {
        return {model: markdown.render(res.data.result)}
      }).catch(function (error) {
        console.log(error.stack)
      })
    }
  }
</script>

<style src="highlight.js/styles/github.css"></style>
<style src="github-markdown-css/github-markdown.css"></style>

<style lang="scss" scoped>
  .layout {
    max-width: 1000px;
    margin: 0 auto;
    .markdown-body {
      padding: 8px 15px 25px 15px;
      background: #ffffff;
    }
  }
</style>
