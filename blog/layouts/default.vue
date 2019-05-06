<template>
  <div>
    <BlogMenu/>
    <div class="content">
      <nuxt/>
    </div>
  </div>
</template>

<script>
  import BlogMenu from "../components/BlogMenu";

  export default {
    components: {BlogMenu}
  }
</script>

<style>
  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }
</style>

<style lang="scss" scoped>
  .content {
    min-width: 280px;
    min-height: 100vh;
    padding: 3.25rem 0 1px;
    background: #f5f5f5;
    overflow: hidden;
  }
</style>
