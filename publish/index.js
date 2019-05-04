const fs = require('fs')
const path = require('path')

function deleteSync(src) {
  if (!fs.existsSync(src)) {
    return
  }
  const stats = fs.statSync(src)
  if (stats.isFile()) {
    fs.unlinkSync(src)
  } else if (stats.isDirectory()) {
    const paths = fs.readdirSync(src)
    paths.forEach(function (path) {
      deleteSync(src + "/" + path)
    })
    fs.rmdirSync(src)
  }
}

function mkdirsSync(src) {
  if (fs.existsSync(src)) {
    return true
  }
  if (mkdirsSync(path.dirname(src))) {
    fs.mkdirSync(src)
    return true
  }
}

function copySync(src, dst) {
  if (src.indexOf('node_modules') !== -1) {// 排除node_modules目录
    return
  }
  const stats = fs.statSync(src)
  if (stats.isFile()) {
    const readable = fs.createReadStream(src)
    const writable = fs.createWriteStream(dst)
    readable.pipe(writable)// 注意此处是异步的
  } else if (stats.isDirectory()) {
    mkdirsSync(dst)
    const paths = fs.readdirSync(src)
    paths.forEach(function (path) {
      copySync(src + '/' + path, dst + '/' + path)
    })
  }
}

const root = '../'

function clear(src) {
  deleteSync(root + src)
}

function copy(src, dst) {
  copySync(root + src, root + dst)
}

const env = process.env.PUBLISH_ENV
if ('clear' === env) {
  clear('blog/static/admin')
  clear('publish/dist')

} else if ('admin' === env) {
  clear('blog/static/admin')
  copy('admin/dist', 'blog/static/admin')

} else if ('release' === env) {
  clear('publish/dist')
  copy('config', 'publish/dist/config')
  copy('server', 'publish/dist/server')
  copy('blog', 'publish/dist/blog')
}
