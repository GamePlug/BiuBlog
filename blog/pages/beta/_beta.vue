<template>
  <div class="blog-layout">
    <h1>
      <BlogText class="blog-tip" :text="`${this.$route.params.beta}功能正在内测中，敬请期待！`"/>
    </h1>
  </div>
</template>

<script>
  import BlogText from "../../components/BlogText";

  export default {
    components: {BlogText},
    head() {
      return {title: this.$route.params.beta}
    }
  }
</script>

<style class="scss" scoped>
  .blog-tip {
    margin-top: 2rem;
  }
</style>
