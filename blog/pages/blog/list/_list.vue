<template>
  <div class="layout">
    <div v-for="item in list">
      <nuxt-link :to="`/blog/${item.id}`">
        <section class="hero is-primary">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                {{ item.name }}
              </h1>
              <h2 class="subtitle">
                {{ item.name }}
              </h2>
              <span class="tag is-light">Android</span>
              &nbsp;&nbsp2018-08-08 08:08
            </div>
          </div>
        </section>
      </nuxt-link>
    </div>
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
    margin: 1.5rem 15px;
    border-radius: 5px;
    .hero-body {
      padding: 1rem;
    }
  }
</style>
