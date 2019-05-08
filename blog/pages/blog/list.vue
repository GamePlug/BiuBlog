<template>
  <div class="layout">
    <BlogCrumb :breadcrumbs="breadcrumbs"/>
  </div>
</template>

<script>
  import BlogCrumb from "../../components/BlogCrumb";

  export default {
    components: {BlogCrumb},
    head() {
      return {title: '列表'}
    },

    data() {
      return {
        model: '',
        breadcrumbs: [
          {name: '首页', url: '/'},
          {name: '列表'},
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .layout {
    max-width: 1000px;
    margin: 0 auto;
  }
</style>
