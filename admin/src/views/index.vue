<template>
  <div class="biu-layout">
    <div>
      <router-link to="/">Home</router-link>
      |
      <router-link to="/blog/write">Write</router-link>
    </div>
    <img alt="Vue logo" src="../assets/logo.png">
    <BiuLogo/>
  </div>
</template>

<script>
  import BiuLogo from "../components/BiuLogo";

  export default {
    components: {BiuLogo}
  }
</script>

<style lang="scss" scoped>
  .biu-layout {
    max-width: 1000px;
    margin: 0 auto;
  }
</style>
