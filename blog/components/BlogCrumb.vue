<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <template v-for="item in breadcrumbs">
        <li v-if="item.url && item.url.length !== 0">
          <nuxt-link :to="item.url" noPrefetch>{{ item.name }}</nuxt-link>
        </li>
        <li v-else class="is-active">
          <a aria-current="page">{{ item.name }}</a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: "BlogCrumb",

    props: {
      breadcrumbs: Array
    }
  }
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all.sass";
  @import "~bulma/sass/components/breadcrumb.sass";

  .breadcrumb {
    margin: 1.5rem 15px;
    ul {
      padding: 0;
    }
    a {
      color: #3273dc;
      text-decoration: none;
      &:hover {
        color: #3273dc;
      }
    }
  }
</style>
