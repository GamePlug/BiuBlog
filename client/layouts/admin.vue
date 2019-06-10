<template>
  <div>
    <BiuMenu :data="data"/>
    <div class="biu-content">
      <nuxt/>
    </div>
  </div>
</template>

<script>
  import url from "~/assets/lib/url"
  import BiuMenu from "../components/BiuMenu";

  export default {
    components: {BiuMenu},
    data() {
      return {
        data: {
          logo: {name: '管理', url: url.admin},
          left: [
            {name: '博客管理', url: url.blogManage},
            {name: '写博客', url: url.blogWrite}
          ],
          more: [],
          right: [
            {name: 'Github', url: url.a.github},
            {name: '写博客', url: url.a.blogWrite}
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .biu-content {
    padding-top: 3.25rem;
    background: #ffffff;
  }
</style>
