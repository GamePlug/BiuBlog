<template>
  <div class="biu-layout">
    <BlogText class="biu-welcome" text="欢迎访问雷超的个人网页，愿您浏览愉快，健康成长！"/>
    <div class="biu-start">
      <nuxt-link class="biu-btn" :to="url.blogList()">
        开启神奇之旅
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import url from "~/assets/lib/url"
  import BlogText from "~/components/BiuText";

  export default {
    layout: 'blog',
    components: {BlogText},
    head() {
      return {title: '首页'}
    },
    data() {
      return {
        url
      }
    },
  }
</script>

<style lang="scss" scoped>
  .biu-layout {
    max-width: 1000px;
    margin: 0 auto;
    .biu-welcome {
      margin-top: 2rem;
      font-size: 2rem;
    }
    .biu-start {
      margin-top: 10rem;
      text-align: center;
      .biu-btn {
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
