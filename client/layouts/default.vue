<template>
  <div>
    <BiuMenu/>
    <div class="biu-content">
      <nuxt/>
    </div>
  </div>
</template>

<script>
  import BiuMenu from "../components/BiuMenu";

  export default {
    components: {BiuMenu}
  }
</script>

<style lang="scss" scoped>
  .biu-content {
    padding-top: 3.25rem;
    background: #ffffff;
  }
</style>
