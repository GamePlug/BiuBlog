<template>
  <div class="biu-layout">
    <div class="biu-test">
      关于
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'blog',
    head() {
      return {title: '关于'}
    }
  }
</script>

<style lang="scss" scoped>
  .biu-layout {
    max-width: 1000px;
    margin: 0 auto;
    .biu-test {
      text-align: center;
    }
  }
</style>
