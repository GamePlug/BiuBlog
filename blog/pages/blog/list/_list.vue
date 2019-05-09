<template>
  <div class="layout">
    <nuxt-link v-for="item in list" :key="item.id" :to="`/blog/${item.id}`">{{ item.name }}<br/></nuxt-link>
  </div>
</template>

<script>
  export default {
    head() {
      return {title: '列表'}
    },

    data() {
      return {
        list: []
      }
    },

    asyncData({params, $axios}) {
      return $axios.post('blog/list', {
        id: params.list || ''
      }).then((res) => {
        return {list: res.data.result}
      }).catch(function (error) {
        console.log(error.stack)
      })
    }
  }
</script>

<style lang="scss" scoped>
</style>
