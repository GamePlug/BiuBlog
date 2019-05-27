<template>
  <div class="blog-layout">
    <h1>
      <BlogText class="blog-welcome" text="欢迎访问雷超的个人网页，愿您浏览愉快，健康成长！"/>
    </h1>
    <div class="blog-start">
      <nuxt-link class="blog-btn" to="/blog/list">
        开启神奇之旅
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import BlogText from "../components/BlogText";

  export default {
    components: {BlogText},
    head() {
      return {title: '首页'}
    }
  }
</script>

<style lang="scss" scoped>
  .blog-layout {
    max-width: 1000px;
    margin: 0 auto;
    .blog-welcome {
      margin-top: 2rem;
    }
    .blog-start {
      margin-top: 10rem;
      text-align: center;
      .blog-btn {
        display: inline-block;
        font-size: 1.2rem;
        color: #ffffff;
        background-color: #3eaf7c;
        padding: .8rem 1.6rem;
        border-radius: 4px;
        transition: background-color .1s ease;
        box-sizing: border-box;
        border-bottom: 1px solid #389d70;
        &:hover {
          background-color: #4abf8a;
        }
      }
    }
  }
</style>
