<template>
  <div>
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </nuxt-link>
        <a class="navbar-burger is-active" role="button" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <nuxt-link class="navbar-item" to="/">
            Home
          </nuxt-link>
          <nuxt-link class="navbar-item" to="/blog">
            Blog
          </nuxt-link>
          <nuxt-link class="navbar-item" to="/about">
            About
          </nuxt-link>
          <nuxt-link class="navbar-item" to="/contact">
            Contact
          </nuxt-link>
        </div>

        <div class="navbar-end">
          <nuxt-link class="navbar-item" to="/">
            Home
          </nuxt-link>
          <nuxt-link class="navbar-item" to="/blog">
            Blog
          </nuxt-link>
          <nuxt-link class="navbar-item" to="/about">
            About
          </nuxt-link>
          <nuxt-link class="navbar-item" to="/contact">
            Contact
          </nuxt-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "BlogMenu"
  }
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all.sass";
  @import "~bulma/sass/components/navbar.sass";
  @import "~bulma/sass/elements/button.sass";

  .navbar {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .08);
    a {
      text-decoration: none;
    }
  }
</style>
