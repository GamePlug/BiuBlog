<template>
  <div class="layout">
    <BlogCrumb :breadcrumbs="breadcrumbs"/>
    <div class="tabs is-centered">
      <ul>
        <li v-for="item in tabs" :class="item.id === id ? 'is-active' : ''">
          <nuxt-link :to="`/blog/list${item.id && item.id.length > 0 ? '/'+item.id : ''}`" noPrefetch>
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <nuxt-link v-for="n in 40" :key="n" to="/blog/1001" noPrefetch>Markdown 语法简介<br/></nuxt-link>
  </div>
</template>

<script>
  import BlogCrumb from "../../../components/BlogCrumb";

  export default {
    components: {BlogCrumb},
    head() {
      return {title: '列表'}
    },

    data() {
      return {
        id: this.$route.params.list || '',
        breadcrumbs: [],
        tabs: []
      }
    },

    asyncData({params, $axios}) {
      return $axios.post('blog/list/type').then((res) => {
        // tabs
        const tabs = res.data.result
        tabs.unshift({name: '全部', id: ''})
        // breadcrumbs
        const cur = res.data.result.find(function (obj) {
          return obj.id === params.list
        })
        const breadcrumbs = [
          {name: '首页', url: '/'},
          {name: '博客精品', url: cur ? '/blog/list' : ''}
        ]
        if (cur) breadcrumbs.push({name: cur.name})
        return {tabs: tabs, breadcrumbs: breadcrumbs}
      }).catch(function (error) {
        console.log(error.stack)
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all.sass";
  @import "~bulma/sass/components/tabs";

  .layout {
    max-width: 1000px;
    margin: 0 auto;
    .tabs {
      line-height: 1.5rem;
      ul {
        padding: 0;
      }
    }
  }
</style>
