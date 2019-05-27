<template>
  <div class="blog-layout">
    <BlogCrumb :breadcrumbs="breadcrumbs"/>
    <div class="blog-item">
      <h2 class="blog-title">{{ blog.title }}</h2>
      <div class="blog-label">
        <span class="blog-time">时间：{{ formatTime(blog.date) }}</span>
        <span class="blog-type">分类：{{blog.type ? blog.type.name : '其它'}}</span>
      </div>
    </div>
    <div class="markdown-body" v-html="blog.content"></div>
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
        blog: {},
        breadcrumbs: []
      }
    },

    asyncData({params, $axios}) {
      return $axios.post('blog/one', {
        id: params.blog || ''
      }).then((res) => {
        // blog
        const blog = res.data.result
        // breadcrumbs
        const breadcrumbs = [
          {name: '首页', url: '/'},
          {name: '博客精品', url: '/blog/list'}
        ]
        if (blog.type) {
          breadcrumbs.push({name: blog.type.name, url: `/blog/list/${blog.type.id}`})
        }
        return {blog, breadcrumbs}
      }).catch(function (error) {
        console.log(error.stack)
      })
    },

    methods: {
      formatTime(time) {
        const change = t => t < 10 ? "0" + t : t
        const d = new Date(parseInt(time))
        const year = d.getFullYear()
        const month = change(d.getMonth() + 1)
        const day = change(d.getDate())
        const hour = change(d.getHours())
        const minute = change(d.getMinutes())
        return time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
      }
    }
  }
</script>

<style src="highlight.js/styles/github.css"></style>
<style src="github-markdown-css/github-markdown.css"></style>

<style lang="scss" scoped>
  .blog-layout {
    max-width: 1000px;
    margin: 0 auto;
    .blog-item {
      text-align: center;
      margin-bottom: 1.5rem;
      .blog-title {
        margin-bottom: 0.5rem;
        color: #333333;
      }
      .blog-label {
        font-size: 0.9rem;
        color: #919898;
        .blog-type {
          margin-left: 1rem;
        }
      }
    }
    .markdown-body {
      padding: 1.5rem 1rem;
      border: 1px solid #eaecef;
      background: #ffffff;
    }
  }
</style>
