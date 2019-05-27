<template>
  <div class="biu-layout">
    <BiuCrumb :breadcrumbs="breadcrumbs"/>
    <div class="tabs is-centered is-medium">
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
  import BiuCrumb from "../../components/BiuCrumb";

  const title = '精品博客'

  export default {
    components: {BiuCrumb},
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
      return $axios.post('blog/type/list').then((res) => {
        // tabs
        const tabs = res.data.result
        tabs.unshift({id: '', name: '全部', sort: 0})
        // breadcrumbs
        const id = params.list || ''
        const breadcrumbs = getBreadcrumbs(tabs, id)
        return {tabs, breadcrumbs}
      }).catch(function (error) {
        console.log(error.stack)
      })
    },

    watch: {
      $route(to, from) {
        this.id = to.params.list || ''
        this.breadcrumbs = getBreadcrumbs(this.tabs, this.id)
      }
    }
  }

  function getBreadcrumbs(tabs, id) {
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

  .biu-layout {
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
