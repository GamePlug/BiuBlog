<template>
  <div class="biu-box" :style="`--radius: ${radius};`">
    <div class="biu-l"></div>
    <div class="biu-r"></div>
    <div class="biu-c">
      <div class="biu-bc"></div>
      <div class="biu-wc"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BiuLogo",

    props: {
      radius: {
        type: String,
        default: '1rem'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .biu-box {
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
    .biu-l {
      width: var(--radius);
      height: inherit;
      background-color: #000;
    }
    .biu-r {
      width: var(--radius);
      height: inherit;
      background-color: #ddd;
    }
    .biu-c {
      width: var(--radius);
      height: inherit;
      position: absolute;
      margin-left: calc(var(--radius) / -2);
      left: 50%;
      top: 0;
      .biu-wc {
        width: var(--radius);
        height: var(--radius);
        border: calc(var(--radius) / 3) solid #ddd;
        background-color: #000;
        border-radius: 50%;
      }
      .biu-bc {
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
