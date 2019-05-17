<template>
  <div class="layout">
    <BlogCrumb :breadcrumbs="breadcrumbs"/>
    <div class="markdown-body" v-html="model"></div>
  </div>
</template>

<script>
  import BlogCrumb from "../../components/BlogCrumb";

  export default {
    components: {BlogCrumb},
    head() {
      return {title: '博客'}
    },

    data() {
      return {
        model: '',
        breadcrumbs: [
          {name: '首页', url: '/'},
          {name: '博客精品', url: '/blog/list'},
          {name: 'Java', url: '/blog/list/java'}
        ]
      }
    },

    asyncData({params, $axios}) {
      return $axios.post('blog/one', {
        id: params.blog || ''
      }).then((res) => {
        const blog = res.data.result
        // model
        const model = blog.content
        // breadcrumbs
        const breadcrumbs = [
          {name: '首页', url: '/'},
          {name: '博客精品', url: '/blog/list'}
        ]
        if (blog.type) {
          breadcrumbs.push({name: blog.type.name, url:`/blog/list/${blog.type.id}`})
        }
        return {model, breadcrumbs}
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
      padding: 1.5rem 1rem;
      border: 1px solid #dddddd;
      background: #ffffff;
    }
  }
</style>
