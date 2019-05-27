<template>
  <div class="blog-layout">
    <div class="columns" v-for="r in Math.ceil(list.length/num)">
      <div class="column" v-for="c in num" v-if="item = getItem(r, c)" :class="getClass()">
        <nuxt-link :to="`/blog/${item.id}`">
          <div class="blog-item">
            <h2 class="blog-title">{{ item.title }}</h2>
            <div class="blog-label">
              <span class="blog-time">时间：{{ util.formatTime(item.date) }}</span>
              <span class="blog-type">分类：{{item.type ? item.type.name : '其它'}}</span>
            </div>
            <div class="blog-subtitle">{{ item.subtitle }}</div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  import util from "../../../assets/lib/util"

  export default {
    data() {
      return {
        util,
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
  @import "~bulma/sass/grid/columns.sass";

  .blog-layout {
    padding-bottom: 1.5rem;
    .columns {
      margin-left: 0;
      margin-right: 0;
      .blog-item {
        padding: 1rem;
        border-radius: 5px;
        background-color: #f6f8fa;
        &:hover {
          background-color: #f0f0f0;
        }
        .blog-title {
          margin-bottom: 0.5rem;
          color: #333333;
        }
        .blog-subtitle {
          margin-top: 0.5rem;
          color: #333333;
          line-height: 1.5rem;
        }
        .blog-label {
          font-size: 0.9rem;
          color: #919898;
          .blog-type {
            margin-left: 1rem;
          }
        }
      }
    }
  }
</style>
