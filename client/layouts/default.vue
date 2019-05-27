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

  a {
    color: #3273dc;
    text-decoration: none;
  }
</style>

<style lang="scss" scoped>
  .biu-content {
    padding-top: 3.25rem;
    background: #ffffff;
  }
</style>
