<template>
  <div class="biu-layout">
    <div class="biu-content">
      <div class="biu-title">
        <label><input type="text" value=""></label>
        <a class="button is-primary">发表博客</a>
      </div>
      <div class="biu-menu">
        <div class="buttons">
          <a class="button is-text" @click="clickFull">全屏</a>
          <a class="button is-text" @click="clickImport">导入</a>
          <a class="button is-text" @click="clickExport">导出</a>
          <a class="button is-text" @click="clickSave">保存</a>
        </div>
      </div>
      <div class="biu-article" v-show="!isFull">
        <label><textarea class="biu-edit" v-model="mdEdit" ref="vEdit" @scroll="scrollEdit"
                         @mouseover="hoverEdit"></textarea></label>
        <div class="biu-view markdown-body" v-html="mdView" ref="vView" @scroll="scrollView"
             @mouseover="hoverView"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import markdown from "common/markdown"
  import 'common/markdown/style.css'

  export default {
    data() {
      return {
        mdEdit: '',
        mdView: '',
        isEdit: false,
        isFull: false
      }
    },
    methods: {
      clickFull() {
        this.isFull = !this.isFull
        const vEdit = this.$refs.vEdit
        const vView = this.$refs.vView
        vEdit.style.width = '0'
        vView.style.width = '100%'
      },
      clickImport() {

      },
      clickExport() {

      },
      clickSave() {

      },
      scrollEdit() {
        const vEdit = this.$refs.vEdit
        const vView = this.$refs.vView
        if (this.isEdit) {
          vView.scrollTop = vEdit.scrollTop * vView.scrollHeight / vEdit.scrollHeight
        }
      },
      scrollView() {
        const vEdit = this.$refs.vEdit
        const vView = this.$refs.vView
        if (!this.isEdit) {
          vEdit.scrollTop = vView.scrollTop * vEdit.scrollHeight / vView.scrollHeight
        }
      },
      hoverEdit() {
        this.isEdit = true
      },
      hoverView() {
        this.isEdit = false
      }
    },
    watch: {
      mdEdit(newValue, oldValue) {
        this.mdView = markdown.render(newValue)
      }
    }
  }
</script>

<style lang="scss" scoped>
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
        background-color: #f5f5f5;
        .button {
          height: 2rem;
          margin: 0;
          padding: 0 0.3rem;
          &:hover {
            background-color: #eeeeee;
          }
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
          overflow-y: scroll;
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
          background-color: #ffffff;
          overflow-y: auto;
        }
      }
    }
  }
</style>
