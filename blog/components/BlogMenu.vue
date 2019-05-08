<template>
  <div>
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/" noPrefetch>
          <img src="@/assets/images/logo.png" width="112" height="28">
        </nuxt-link>
        <a class="navbar-burger" role="button" aria-label="menu" aria-expanded="false"
           :class="isActive" @click="onBurgerClick">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="isActive">
        <div class="navbar-start">
          <nuxt-link class="navbar-item" @click.native="onMenuClick" noPrefetch
                     v-for="item in menuData.menuLeft" :key="item.url" :to="item.url">
            {{ item.name }}
          </nuxt-link>

          <div class="navbar-item has-dropdown is-hoverable"
               v-if="menuData.menuMore && menuData.menuMore.length > 0">
            <a class="navbar-link">
              更多
            </a>
            <div class="navbar-dropdown">
              <nuxt-link class="navbar-item" @click.native="onMenuClick" noPrefetch
                         v-for="item in menuData.menuMore" :key="item.url" :to="item.url">
                {{ item.name }}
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary" @click="onMenuClick" target="_blank"
                 v-for="item in menuData.menuRight" :key="item.url" :href="item.url">
                {{ item.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "BlogMenu",

    data() {
      return {
        menuData: {
          logo: '雷超',
          menuLeft: [
            {name: '博客精品', url: '/blog/list'},
            {name: '原创小说', url: '/'},
            {name: '心情随笔', url: '/'},
            {name: '资源收藏', url: '/'},
            {name: '留言板', url: '/'}
          ],
          menuMore: [],
          menuRight: [
            {name: 'Github', url: '/github'},
            {name: '后台管理', url: '/admin'}
          ]
        },
        isActive: ''
      }
    },

    methods: {
      onBurgerClick() {
        this.isActive = this.isActive !== 'is-active' ? 'is-active' : ''
      },
      onMenuClick() {
        this.isActive = ''
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
  }
</style>
