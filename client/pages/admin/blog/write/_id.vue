<template>
  <div class="biu-layout">
    <div class="biu-content">
      <div class="biu-title">
        <label><input type="text" v-model="mdTitle" placeholder="请输入博客标题"></label>
        <a class="button is-primary" @click="clickPublish">发表博客</a>
      </div>
      <div class="biu-menu">
        <div class="buttons">
          <a class="button is-text" @click="menuFull">{{ isFull ? '预览' : '全屏' }}</a>
          <a class="button is-text" @click="menuImport">导入</a>
          <a class="button is-text" @click="menuExport">导出</a>
          <a class="button is-text" @click="menuSave">保存</a>
        </div>
      </div>
      <div class="biu-article">
        <label><textarea class="biu-edit" v-model="mdEdit" ref="vEdit" @scroll="scrollEdit"
                         @mouseover="hoverEdit"></textarea></label>
        <div class="biu-view markdown-body" v-html="mdView" ref="vView" @scroll="scrollView"
             @mouseover="hoverView" v-show="!isFull"></div>
      </div>
    </div>

    <div class="modal" :class="modalActiveClass">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">发表博客</p>
        </header>
        <section class="modal-card-body">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">标题:</label>
            </div>
            <div class="field-body field control">
              <input class="input" type="text" placeholder="请输入博客标题">
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">副标题:</label>
            </div>
            <div class="field-body field control">
              <textarea class="textarea" placeholder="请输入博客副标题"></textarea>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label" for="biu-type">分类:</label>
            </div>
            <div class="field-body">
              <div class="select">
                <select id="biu-type">
                  <option>Android</option>
                  <option>Java</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">置顶:</label>
            </div>
            <div class="field-body">
              <label class="checkbox">
                <input type="checkbox">
                置顶
              </label>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="onModalActiveChange('')">取消</button>
          <button class="button is-success" :class="isLoading?'is-loading':''" @click="modalPublish">确认发表</button>
        </footer>
        <progress class="progress is-success" v-if="isLoading"></progress>
        <div class="notification is-danger" v-if="errMsg && !isLoading">{{ errMsg }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import markdownCdn from "common/markdown/cdn"
  import 'common/markdown/style.css'

  export default {
    layout: 'default',
    head() {
      return {
        title: '博客编辑',
        script: markdownCdn.script
      }
    },
    data() {
      return {
        markdown: undefined,
        blog: {},
        mdTitle: '',
        mdEdit: '',
        mdView: '',
        isEdit: false,
        isFull: false,
        modalActiveClass: false,
        isLoading: false,
        errMsg: '',
        errMsgTimeOut: undefined
      }
    },
    asyncData({params, $axios, error}) {
      if (params.id) {// 有id则从服务器取blog
        return $axios.post('blog/one', {
          id: params.id || '',
          mode: 'edit'
        }).then(res => {
          if (res.data.err) {
            return error({statusCode: 404, message: 'This page could not be found'})
          }
          return {blog: res.data.result}
        }).catch(err => {
          error({statusCode: 404, message: 'This page could not be found'})
          console.log(err.stack)
        })
      }
    },
    mounted() {
      if (!this.blog.id) {// 无id则从本地缓存取blog
        this.blog = {
          id: '',
          title: 'title',
          subtitle: 'subtitle',
          content: '# 还没有内容哦',
          type: {
            id: ''
          },
          date: '',
          status: 1,
          top: 0
        }
      }
      this.mdTitle = this.blog.title
      const interval = setInterval(() => {
        if (this.markdown) {
          clearInterval(interval)
        } else if (typeof(markdownit) !== 'undefined' && typeof(hljs) !== 'undefined') {
          this.markdown = markdownCdn.build(markdownit, hljs)
          this.mdEdit = this.blog.content
          clearInterval(interval)
        }
      }, 100)
    },
    watch: {
      mdTitle(newValue, oldValue) {
        this.blog.title = newValue
      },
      mdEdit(newValue, oldValue) {
        this.blog.content = newValue
        if (this.markdown) {
          this.mdView = this.markdown.render(newValue)
        } else {
          this.mdEdit = ''
        }
      }
    },
    methods: {
      clickPublish() {
        this.onModalActiveChange()
      },
      onModalActiveChange(activeClass) {
        if (typeof activeClass === 'string') {
          this.modalActiveClass = activeClass
        } else {
          this.modalActiveClass = this.modalActiveClass !== 'is-active' ? 'is-active' : ''
        }
      },
      modalPublish() {
        if (this.isLoading) return
        this.isLoading = true
        this.$axios.post('blog/save', {
          id: this.blog.id,
          title: this.blog.title,
          subtitle: this.blog.subtitle,
          content: this.blog.content,
          type: this.blog.type.id,
          date: '',
          status: 1,
          top: this.blog.top
        }).then(res => {
          this.isLoading = false
          if (res.data.err) {
            handleErr(res.data.message)
            return
          }
          this.onModalActiveChange('')
        }).catch(err => {
          this.isLoading = false
          handleErr('Server Error')
          console.log(err.stack)
        })
        const handleErr = errMsg => {
          this.errMsg = errMsg
          if (this.errMsgTimeOut) clearTimeout(this.errMsgTimeOut)
          this.errMsgTimeOut = setTimeout(() => {
            this.errMsg = ''
          }, 3000)
        }
      },
      menuFull() {
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
      menuImport() {

      },
      menuExport() {

      },
      menuSave() {

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
    }
  }
</script>

<style lang="scss" scoped>
  .biu-layout {
    .biu-content {
      height: 100vh;
      .biu-title {
        height: 3rem;
        background-color: #ffffff;
        input {
          width: calc(100% - 9rem);
          height: 100%;
          padding-left: 1rem;
          font-size: 1.5rem;
          border: 0;
          color: #333333;
          outline: none;
        }
        .button {
          margin: 0.5rem 0 0 1rem;
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
        }
      }
      .biu-article {
        height: calc(100% - 5rem);
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
    .modal {
      .modal-card-head {
        text-align: center;
      }
      .modal-card-body {
        .checkbox {
          line-height: 2.25rem;
        }
      }
      .modal-card-foot {
        justify-content: flex-end
      }
      .progress, .notification {
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
      }
    }
  }
</style>
