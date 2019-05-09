<template>
  <div class="layout">
    <BlogCrumb :breadcrumbs="breadcrumbs"/>
    <div class="tabs is-centered">
      <ul>
        <li v-for="item in tabs" :class="item.id === id ? 'is-active' : ''">
          <nuxt-link :to="`/blog/list${item.id && item.id.length > 0 ? '/'+item.id : ''}`">
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <nuxt-child/>
  </div>
</template>

<script>
  import BlogCrumb from "../../components/BlogCrumb";

  const title = '博客精品'

  export default {
    components: {BlogCrumb},
    head() {
      return {title: title}
    },

    data() {
      return {
        id: this.$route.params.list || '',
        breadcrumbs: [],
        tabs: []
      }
    },

    asyncData({params, $axios}) {
      return $axios.post('blog/type').then((res) => {
        // tabs
        const tabs = res.data.result
        tabs.unshift({name: '全部', id: ''})
        // breadcrumbs
        const id = params.list || ''
        return {tabs: tabs, breadcrumbs: breadcrumbs(tabs, id)}
      }).catch(function (error) {
        console.log(error.stack)
      })
    },

    watch: {
      $route(to, from) {
        this.id = to.params.list || ''
        this.breadcrumbs = breadcrumbs(this.tabs, this.id)
      }
    }
  }

  function breadcrumbs(tabs, id) {
    let cur
    if (id && id.length > 0) {
      cur = tabs.find(obj => obj.id === id)
    }
    const breadcrumbs = [
      {name: '首页', url: '/'},
      {name: title, url: cur ? '/blog/list' : ''}
    ]
    if (cur) breadcrumbs.push({name: cur.name})
    return breadcrumbs
  }
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all.sass";
  @import "~bulma/sass/components/tabs.sass";

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
