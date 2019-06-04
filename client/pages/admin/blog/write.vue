<template>
  <div class="biu-layout">
    <div class="biu-content">
      <div class="biu-title">
        <label><input type="text" v-model="mdTitle" placeholder="请输入标题"></label>
        <a class="button is-light" @click="clickConfig">配置</a>
        <a class="button is-primary" @click="clickPublish">发表博客</a>
      </div>
      <div class="biu-menu">
        <div class="buttons">
          <a class="button is-text" @click="clickFull">{{ isFull ? '预览' : '全屏' }}</a>
          <a class="button is-text" @click="clickImport">导入</a>
          <a class="button is-text" @click="clickExport">导出</a>
          <a class="button is-text" @click="clickSave">保存</a>
        </div>
      </div>
      <div class="biu-article">
        <label><textarea class="biu-edit" v-model="mdEdit" ref="vEdit" @scroll="scrollEdit"
                         @mouseover="hoverEdit"></textarea></label>
        <div class="biu-view markdown-body" v-html="mdView" ref="vView" @scroll="scrollView"
             @mouseover="hoverView" v-show="!isFull"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import markdownCdn from "common/markdown/cdn"
  import 'common/markdown/style.css'

  export default {
    layout: 'empty',
    head() {
      return {
        title: '博客编辑',
        script: markdownCdn.script
      }
    },
    data() {
      return {
        markdown: {},
        mdTitle: '',
        mdEdit: '',
        mdView: '',
        isEdit: false,
        isFull: false
      }
    },
    methods: {
      clickConfig() {

      },
      clickPublish() {
        this.$axios.post('blog/save', {
          type: ''
        }).then((res) => {
          if (res.data.err) return
          return {list: res.data.result}
        }).catch(function (error) {
          console.log(error.stack)
        })
      },
      clickFull() {
        this.isFull = !this.isFull
        const vEdit = this.$refs.vEdit
        const vView = this.$refs.vView
        if (this.isFull) {
          vEdit.style.width = '100%'
          vView.style.width = '0'
        } else {
          vEdit.style.width = '50%'
          vView.style.width = '50%'
        }
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
    mounted() {
      this.markdown = markdownCdn.build(markdownit, hljs)
    },
    watch: {
      mdEdit(newValue, oldValue) {
        this.mdView = this.markdown.render(newValue)
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
          width: calc(100% - 13.5rem);
          height: 100%;
          padding-left: 1rem;
          font-size: 1.5rem;
          border: 0;
          color: #333333;
          outline: none;
        }
        .button {
          margin: 0.5rem 0 0 1rem;
          padding: 0 1rem;
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
          outline: none;
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
