<template>
  <div class="box" :style="`--radius: ${radius};`">
    <div class="l"></div>
    <div class="r"></div>
    <div class="c">
      <div class="bc"></div>
      <div class="wc"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BlogLogo",

    props: {
      radius: {
        type: String,
        default: '1rem'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .box {
    --radius: 1rem;
    width: calc(var(--radius) * 2);
    height: calc(var(--radius) * 2);
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    -webkit-transition: all 2s;
    -webkit-animation: cd 2000ms infinite linear;
    -o-animation: cd 2000ms infinite linear;
    animation: cd 2000ms infinite linear;
    .l {
      width: var(--radius);
      height: inherit;
      background-color: #000;
    }
    .r {
      width: var(--radius);
      height: inherit;
      background-color: #ddd;
    }
    .c {
      width: var(--radius);
      height: inherit;
      position: absolute;
      margin-left: calc(var(--radius) / -2);
      left: 50%;
      top: 0;
      .wc {
        width: var(--radius);
        height: var(--radius);
        border: calc(var(--radius) / 3) solid #ddd;
        background-color: #000;
        border-radius: 50%;
      }
      .bc {
        width: var(--radius);
        height: var(--radius);
        border: calc(var(--radius) / 3) solid #000;
        background-color: #ddd;
        border-radius: 50%;
      }
    }
  }

  @-webkit-keyframes cd {
    0% {
      -webkit-transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(-180deg);
    }
    100% {
      -webkit-transform: rotate(-360deg);
    }
  }
</style>
