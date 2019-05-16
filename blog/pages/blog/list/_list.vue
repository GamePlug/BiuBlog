<template>
  <div class="layout">
    <div class="columns" v-for="r in Math.ceil(list.length/num)">
      <div class="column" v-for="c in num" v-if="item = getItem(r, c)" :class="getClass()">
        <nuxt-link :to="`/blog/${item.id}`">
          <section class="hero is-light">
            <div class="hero-body">
              <div class="container">
                <h1 class="title">{{ item.title }}</h1>
                <h2 class="subtitle">{{ item.content }}</h2>
                <span class="tag is-white">{{item.type ? item.type.name : '暂无分类'}}</span>
                <span class="blog-time">{{ item.date }}</span>
              </div>
            </div>
          </section>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num: 2,
        list: []
      }
    },

    asyncData({params, $axios}) {
      return $axios.post('blog/list', {
        type: params.list || ''
      }).then((res) => {
        return {list: res.data.result}
      }).catch(function (error) {
        console.log(error.stack)
      })
    },

    methods: {
      getItem(r, c) {
        const index = (r - 1) * this.num + c - 1
        return this.list[index]
      },
      getClass() {
        if (12 % this.num === 0) {
          return `is-${12 / this.num}`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all.sass";
  @import "~bulma/sass/layout/hero.sass";
  @import "~bulma/sass/elements/title.sass";
  @import "~bulma/sass/elements/tag.sass";
  @import "~bulma/sass/grid/columns.sass";

  .layout {
    padding-bottom: 1.5rem;
    .columns {
      margin-left: 0;
      margin-right: 0;
      .hero {
        border-radius: 5px;
        &:hover {
          background-color: #eeeeee;
        }
        .hero-body {
          padding: 1rem;
        }
        .blog-time {
          margin-left: 1rem;
          color: #666666;
        }
      }
    }
  }
</style>
