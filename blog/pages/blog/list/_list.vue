<template>
  <div class="layout">
    <nuxt-link v-for="item in list" :key="item.id" :to="`/blog/${item.id}`">
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">{{ item.name }}</h1>
            <h2 class="subtitle">{{ item.name }}</h2>
            <span class="tag is-white">Android</span>
            <span class="blog-time">2018-08-08 08:08</span>
          </div>
        </div>
      </section>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
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
  @import "~bulma/sass/utilities/_all.sass";
  @import "~bulma/sass/layout/hero.sass";
  @import "~bulma/sass/elements/title.sass";
  @import "~bulma/sass/elements/tag.sass";

  .hero {
    margin: 1.5rem 1rem;
    border-radius: 5px;
    .hero-body {
      padding: 1rem;
    }
    .blog-time {
      margin-left: 1rem;
    }
  }
</style>
