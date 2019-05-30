<template>
  <div class="biu-layout">
    <BiuCrumb :breadcrumbs="breadcrumbs"/>
    <div class="tabs is-centered is-medium">
      <ul>
        <li v-for="item in tabs" :class="item.id === id ? 'is-active' : ''">
          <nuxt-link :to="url.blogList(item.id)">
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <nuxt-child/>
  </div>
</template>

<script>
  import url from "~/assets/lib/url"
  import BiuCrumb from "~/components/BiuCrumb";

  const title = '精品博客'
  export default {
    components: {BiuCrumb},
    head() {
      return {title: title}
    },
    data() {
      return {
        url,
        id: this.$route.params.id || '',
        breadcrumbs: [],
        tabs: []
      }
    },
    asyncData({params, $axios}) {
      return $axios.post('blog/type/list').then((res) => {
        if (res.data.err) return
        // tabs
        const tabs = res.data.result
        tabs.unshift({id: '', name: '全部', sort: 0})
        // breadcrumbs
        const id = params.id || ''
        const breadcrumbs = getBreadcrumbs(tabs, id)
        return {tabs, breadcrumbs}
      }).catch(function (error) {
        console.log(error.stack)
      })
    },
    watch: {
      $route(to, from) {
        this.id = to.params.id || ''
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
      {name: '首页', url: url.index},
      {name: title, url: cur ? url.blogList() : ''}
    ]
    if (cur) breadcrumbs.push({name: cur.name, url: ''})
    return breadcrumbs
  }
</script>

<style lang="scss" scoped>
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
