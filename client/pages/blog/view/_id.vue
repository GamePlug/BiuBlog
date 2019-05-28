<template>
  <div class="biu-layout">
    <BiuCrumb :breadcrumbs="breadcrumbs"/>
    <div class="biu-item">
      <h2 class="biu-title">{{ blog.title }}</h2>
      <div class="biu-label">
        <span class="biu-time">时间：{{ util.formatTime(blog.date) }}</span>
        <span class="biu-type">分类：{{blog.type ? blog.type.name : '暂无'}}</span>
      </div>
    </div>
    <div class="markdown-body" v-html="blog.content"></div>
  </div>
</template>

<script>
  import url from "~/assets/lib/url"
  import util from "~/assets/lib/util"
  import BiuCrumb from "~/components/BiuCrumb";

  export default {
    components: {BiuCrumb},
    head() {
      return {title: '博客'}
    },
    data() {
      return {
        url,
        util,
        blog: {},
        breadcrumbs: []
      }
    },
    asyncData({params, $axios}) {
      return $axios.post('blog/one', {
        id: params.id || ''
      }).then((res) => {
        if (res.data.err) return
        // blog
        const blog = res.data.result
        // breadcrumbs
        const breadcrumbs = [
          {name: '首页', url: url.index},
          {name: '博客精品', url: url.blogList()}
        ]
        if (blog.type) {
          breadcrumbs.push({name: blog.type.name, url: url.blogList(blog.type.id)})
        }
        breadcrumbs.push({name: blog.title, url: ''})
        return {blog, breadcrumbs}
      }).catch(function (error) {
        console.log(error.stack)
      })
    }
  }
</script>

<style src="highlight.js/styles/github.css"></style>
<style src="github-markdown-css/github-markdown.css"></style>

<style lang="scss" scoped>
  .biu-layout {
    max-width: 1000px;
    margin: 0 auto;
    .biu-item {
      text-align: center;
      margin-bottom: 1.5rem;
      .biu-title {
        margin-bottom: 0.5rem;
        color: #333333;
      }
      .biu-label {
        font-size: 0.9rem;
        color: #919898;
        .biu-type {
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
