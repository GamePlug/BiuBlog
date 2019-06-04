<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item biu-logo" :to="data.logo.url" @click.native="onActiveChange('')">
        <BiuLogo radius="1rem"/>
        <span>{{ data.logo.name }}</span>
      </nuxt-link>
      <a class="navbar-burger" role="button" aria-label="menu" aria-expanded="false"
         :class="activeClass" @click="onActiveChange">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="activeClass">
      <div class="navbar-start">
        <nuxt-link class="navbar-item" @click.native="onActiveChange('')"
                   v-for="item in data.left" :key="item.url" :to="item.url">
          {{ item.name }}
        </nuxt-link>

        <div class="navbar-item has-dropdown is-hoverable" v-if="data.more && data.more.length > 0">
          <a class="navbar-link">
            更多
          </a>
          <div class="navbar-dropdown">
            <nuxt-link class="navbar-item" @click.native="onActiveChange('')"
                       v-for="item in data.more" :key="item.url" :to="item.url">
              {{ item.name }}
            </nuxt-link>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-light" target="_blank" @click="onActiveChange('')"
               v-for="item in data.right" :key="item.url" :href="item.url">
              <strong>{{ item.name }}</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import url from "~/assets/lib/url"
  import BiuLogo from "~/components/BiuLogo"

  const list = {
    '/admin': {
      logo: {name: '后台管理', url: url.admin},
      left: [
        {name: '博客管理', url: url.blogManage}
      ],
      more: [],
      right: [
        {name: '博客编辑', url: url.a.blogWrite},
        {name: '首页', url: url.a.index}
      ]
    },
    '/': {
      logo: {name: '雷超', url: url.index},
      left: [
        {name: '精品博客', url: url.blogList()},
        {name: '原创小说', url: '/beta/原创小说'},
        {name: '心情随笔', url: '/beta/心情随笔'},
        {name: '推荐收藏', url: '/beta/推荐收藏'},
        {name: '留言板', url: '/beta/留言板'},
        {name: '关于', url: url.about}
      ],
      more: [],
      right: [
        {name: 'Github', url: url.a.github},
        {name: '后台管理', url: url.a.admin}
      ]
    }
  }

  export default {
    name: "BiuMenu",
    components: {BiuLogo},
    data() {
      return {
        currentUrl: '',
        activeClass: '',
        data: list['/']
      }
    },
    methods: {
      onActiveChange(activeClass) {
        if (typeof activeClass === 'string') {
          this.activeClass = activeClass
        } else {
          this.activeClass = this.activeClass !== 'is-active' ? 'is-active' : ''
        }
      }
    },
    created() {
      this.currentUrl = this.$route.path
    },
    watch: {
      $route(to, from) {
        this.currentUrl = to.path
        this.onActiveChange('')
      },
      currentUrl(newUrl, oldUrl) {
        for (let key in list) {
          if (list.hasOwnProperty(key) && newUrl.startsWith(key)) {
            this.data = list[key]
            break;
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .08);
    .nuxt-link-active {
      color: #3273dc
    }
    .biu-logo {
      padding: 0 1rem;
      span {
        color: #333333;
        font-size: 1.5rem;
        font-weight: bold;
        margin-left: 1rem;
      }
    }
  }
</style>
