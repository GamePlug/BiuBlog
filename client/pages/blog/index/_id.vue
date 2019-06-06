<template>
  <div class="biu-layout">
    <div class="columns" v-for="r in Math.ceil(list.length/num)">
      <div class="column" v-for="c in num" v-if="item = getItem(r, c)" :class="getClass()">
        <nuxt-link :to="url.blogView(item.id)">
          <div class="biu-item">
            <span class="biu-title">{{ item.title }}</span>
            <div class="biu-label">
              <span class="biu-time">时间：{{ util.formatTime(item.date) }}</span>
              <span class="biu-type">分类：{{item.type ? item.type.name : '暂无'}}</span>
            </div>
            <span class="biu-subtitle">{{ item.subtitle }}</span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  import url from "~/assets/lib/url"
  import util from "~/assets/lib/util"

  export default {
    data() {
      return {
        url,
        util,
        num: 2,
        list: []
      }
    },
    asyncData({params, $axios, error}) {
      return $axios.post('blog/list', {
        type: params.id || ''
      }).then(res => {
        if (res.data.err) {
          return error({statusCode: 404, message: 'This page could not be found'})
        }
        return {list: res.data.result}
      }).catch(err => {
        console.log(err.stack)
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
  .biu-layout {
    padding-bottom: 1.5rem;
    .columns {
      margin-left: 0;
      margin-right: 0;
      .biu-item {
        padding: 1rem;
        border-radius: 5px;
        background-color: #f6f8fa;
        &:hover {
          background-color: #f0f0f0;
        }
        .biu-title {
          color: #333333;
          font-size: 1.8rem;
        }
        .biu-subtitle {
          color: #333333;
          line-height: 1.5rem;
        }
        .biu-label {
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: #919898;
          .biu-type {
            margin-left: 1rem;
          }
        }
      }
    }
  }
</style>
