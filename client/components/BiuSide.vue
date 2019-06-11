<template>
  <aside class="menu">
    <ul class="menu-list">
      <li v-for="item in data.list" :key="item.url" >
        <nuxt-link :to="item.url">
          {{ item.name }}
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {
    name: "BiuSide",
    props: {
      data: {
        type: Object,
        default: function () {
          return {}
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menu {
    position: fixed;
    top: var(--biu-bar-height);
    left: 0;
    bottom: 0;
    z-index: 29;
    width: var(--biu-side-width);
    padding: 0.5rem;
    background-color: #ffffff;
    border-right: 1px solid #eeeeee;
    overflow-y: auto;
    li {
      margin-bottom: 0.3rem;
    }
    .nuxt-link-exact-active {
      color: #ffffff;
      background-color: #00c4a7;
    }
  }
</style>

<style>
  body {
    --biu-side-width: 12rem;
  }
</style>
