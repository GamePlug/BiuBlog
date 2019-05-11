<template>
  <div>
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item blog-logo" to="/" @click.native="onActiveChange('')">
          <BlogLogo radius="1rem"/>
          <span>雷超</span>
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
                     v-for="item in menuData.menuLeft" :key="item.url" :to="item.url">
            {{ item.name }}
          </nuxt-link>

          <div class="navbar-item has-dropdown is-hoverable" v-if="menuData.menuMore && menuData.menuMore.length > 0">
            <a class="navbar-link">
              更多
            </a>
            <div class="navbar-dropdown">
              <nuxt-link class="navbar-item" @click.native="onActiveChange('')"
                         v-for="item in menuData.menuMore" :key="item.url" :to="item.url">
                {{ item.name }}
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-light" target="_blank" @click="onActiveChange('')"
                 v-for="item in menuData.menuRight" :key="item.url" :href="item.url">
                <strong>{{ item.name }}</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import BlogLogo from "./BlogLogo";

  export default {
    name: "BlogMenu",
    components: {BlogLogo},

    data() {
      return {
        menuData: {
          logo: '雷超',
          menuLeft: [
            {name: '精品博客', url: '/blog/list'},
            {name: '原创小说', url: '/beta/原创小说'},
            {name: '心情随笔', url: '/beta/心情随笔'},
            {name: '推荐收藏', url: '/beta/推荐收藏'},
            {name: '留言板', url: '/beta/留言板'}
          ],
          menuMore: [],
          menuRight: [
            {name: 'Github', url: 'https://github.com/GamePlug/BiuBlog'},
            {name: '后台管理', url: '/admin'}
          ]
        },
        activeClass: ''
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

    watch: {
      $route(to, from) {
        this.onActiveChange('')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all.sass";
  @import "~bulma/sass/components/navbar.sass";
  @import "~bulma/sass/elements/button.sass";

  .navbar {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .08);
    .blog-logo {
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
