<template>
  <div class="layout">
    <h1>
      <BlogText class="welcome" text="欢迎访问雷超的个人网页，愿您浏览愉快，健康成长！"/>
    </h1>
  </div>
</template>

<script>
  import BlogText from "../components/BlogText";

  export default {
    components: {BlogText},
    head() {
      return {title: '首页'}
    },

    created() {
      const that = this
      setTimeout(function () {
        that.$router.push({path: '/blog/list'})
      }, 3000)
    }
  }
</script>

<style lang="scss" scoped>
  .layout {
    max-width: 1000px;
    margin: 0 auto;
    .welcome {
      margin-top: 2rem;
    }
  }
</style>
