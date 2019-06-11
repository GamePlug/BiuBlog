<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link v-if="data.logo" class="navbar-item biu-logo" :to="data.logo.url" @click.native="onActiveChange('')">
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
  import BiuLogo from "~/components/BiuLogo"

  export default {
    name: "BiuBar",
    components: {BiuLogo},
    props: {
      data: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
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
  .navbar {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .08);
    a.navbar-item {
      &.nuxt-link-active {
        color: #3273dc;
        background-color: #f6f8fa;
      }
      &.biu-logo,
      &:not(.nuxt-link-active) {
        color: #4a4a4a;
        background-color: #ffffff;
      }
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

<style>
  body {
    --biu-bar-height: 3.25rem;
  }
</style>
