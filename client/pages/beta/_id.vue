<template>
  <div class="biu-layout">
    <h1>
      <BiuText class="biu-tip" :text="`${this.$route.params.id}功能正在内测中，敬请期待！`"/>
    </h1>
  </div>
</template>

<script>
  import BiuText from "~/components/BiuText";

  export default {
    components: {BiuText},
    head() {
      return {title: this.$route.params.id}
    }
  }
</script>

<style class="scss" scoped>
  .biu-tip {
    margin-top: 2rem;
  }
</style>
