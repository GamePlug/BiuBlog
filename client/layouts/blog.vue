<template>
  <div>
    <BiuBar :data="barData"/>
    <div class="biu-content">
      <nuxt/>
    </div>
  </div>
</template>

<script>
  import url from "~/assets/lib/url"
  import BiuBar from "~/components/BiuBar"

  export default {
    components: {BiuBar},
    data() {
      return {
        barData: {
          logo: {name: '雷超', url: url.index},
          left: [
            {name: '精品博客', url: url.blogList()},
            {name: '原创小说', url: '/beta/原创小说'},
            {name: '心情随笔', url: '/beta/心情随笔'},
            {name: '推荐收藏', url: '/beta/推荐收藏'},
            {name: '留言板', url: '/beta/留言板'},
            {name: '关于', url: url.about}
          ],
          more: [],
          right: [
            {name: 'Github', url: url.a.github},
            {name: '管理', url: url.a.admin}
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .biu-content {
    padding-top: var(--biu-bar-height);
  }
</style>
