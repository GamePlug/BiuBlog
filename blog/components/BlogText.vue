<template>
  <div class="blog-text">
    {{ text }}
  </div>
</template>

<script>
  export default {
    name: "BlogText",

    props: {
      text: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .blog-text {
    display: block;
    text-align: center;
    background-image: -webkit-linear-gradient(left, #3498db, #f47920 10%, #d71345 20%, #f7acbc 30%,
      #ffd400 40%, #3498db 50%, #f47920 60%, #d71345 70%, #f7acbc 80%, #ffd400 90%, #3498db);
    color: transparent;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-size: 200% 100%;
    animation: masked-animation 4s infinite linear;
  }

  @keyframes masked-animation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
</style>
