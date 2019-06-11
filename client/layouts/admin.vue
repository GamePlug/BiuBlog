<template>
  <div>
    <BiuBar :data="barData"/>
    <BiuSide :data="sideData"/>
    <div class="biu-content">
      <nuxt/>
    </div>
  </div>
</template>

<script>
  import url from "~/assets/lib/url"
  import BiuBar from "~/components/BiuBar"
  import BiuSide from "~/components/BiuSide"

  export default {
    components: {BiuBar, BiuSide},
    data() {
      return {
        barData: {
          logo: {name: '管理', url: url.admin},
          left: [
            {name: '博客管理', url: url.blogManage},
            {name: '权限管理', url: url.authManage}
          ],
          more: [],
          right: [
            {name: 'Github', url: url.a.github}
          ]
        },
        sideData: {
          list: []
        },
        sideDataSource: {
          '/admin/blog': {
            list: [
              {name: '博客管理', url: url.blogManage},
              {name: '博客分类', url: url.blogType},
              {name: '博客草稿箱', url: url.blogDraft},
              {name: '博客回收站', url: url.blogRecycle},
              {name: '博客编辑', url: url.blogWrite()}
            ]
          },
          '/admin/auth': {
            list: [
              {name: '权限管理', url: url.authManage},
              {name: '权限说明', url: url.authExplain}
            ]
          },
          '/admin': {
            list: [
              {name: '管理首页', url: url.admin}
            ]
          }
        }
      }
    },
    created() {
      this.updateSideData()
    },
    watch: {
      $route(to, from) {
        this.updateSideData()
      }
    },
    methods: {
      updateSideData() {
        for (let key in this.sideDataSource) {
          if (this.sideDataSource.hasOwnProperty(key) && this.$route.path.startsWith(key)) {
            this.sideData = this.sideDataSource[key]
            break
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .biu-content {
    padding: var(--biu-bar-height) 0 0 var(--biu-side-width);
  }
</style>
