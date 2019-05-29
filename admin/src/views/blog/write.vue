<template>
  <div class="biu-layout">
    <div class="biu-content">
      <div class="biu-title">
        <label><input type="text" value=""></label>
        <a class="button is-primary">发表博客</a>
      </div>
      <div class="biu-menu">
        <div class="buttons">
          <a class="button is-text">全屏</a>
          <a class="button is-text">导入</a>
          <a class="button is-text">导出</a>
          <a class="button is-text">保存</a>
        </div>
      </div>
      <div class="biu-article">
        <label><textarea class="biu-edit" v-model="mdEdit"></textarea></label>
        <div class="biu-view">{{ mdView }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mdEdit: '',
        mdView: ''
      }
    },
    watch: {
      mdEdit(newValue, oldValue) {
        this.mdView = newValue
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all.sass";
  @import "~bulma/sass/elements/button.sass";

  .biu-layout {
    .biu-content {
      .biu-title {
        height: 3rem;
        background-color: #ffffff;
        input {
          width: calc(100% - 9rem);
          height: 100%;
          padding-left: 1rem;
          font-size: 1.8rem;
          border: 0;
          color: #333333;
          &:hover {
            color: #4d96fa
          }
        }
        .button {
          position: absolute;
          top: 0.5rem;
          right: 1rem;
          width: 7rem;
          height: 2rem;
        }
      }
      .biu-menu {
        height: 2rem;
        padding-left: 0.7rem;
        background-color: #eeeeee;
        .button {
          height: 2rem;
          margin: 0;
          padding: 0 0.3rem;
        }
      }
      .biu-article {
        height: calc(100vh - 5rem);
        .biu-edit {
          position: relative;
          float: left;
          width: 50%;
          height: 100%;
          padding: 0 1rem;
          background-color: #ffffff;
          resize: none;
          font-size: 1.25rem;
          font-family: sans-serif, 宋体;
          color: #000000;
          border: hidden;
        }
        .biu-view {
          position: relative;
          float: right;
          width: 50%;
          height: 100%;
          padding: 0 1rem;
          background-color: #f5f5f5;
          overflow-y: auto;
        }
      }
    }
  }
</style>
