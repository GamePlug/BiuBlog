const fs = require('fs')
const path = require('path')

function deleteDir(src) {
  if (fs.existsSync(src)) {
    const files = fs.readdirSync(src)
    files.forEach(function (path) {
      const curPath = src + "/" + path
      if (fs.statSync(curPath).isDirectory()) {
        deleteDir(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(src)
  }
}

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

function copySync(src, dst) {
  const stats = fs.statSync(src)
  if (stats && stats.isFile()) {
    const readable = fs.createReadStream(src)
    const writable = fs.createWriteStream(dst)
    readable.pipe(writable)// 注意此处是异步的
  } else if (stats && stats.isDirectory()) {
    mkdirsSync(dst)
    const paths = fs.readdirSync(src)
    paths.forEach(function (path) {
      copySync(src + '/' + path, dst + '/' + path)
    })
  }
}

const root = '../'

function clear(src) {
  deleteDir(root + src)
}

function copy(src, dst) {
  copySync(root + src, root + dst)
}

const env = process.env.PUBLISH_ENV
if ("clear" === env) {
  clear('blog/static/admin')
  clear('publish/dist')

} else if ("admin" === env) {
  copy('admin/dist', 'blog/static/admin')

} else if ("release" === env) {
  const configPath = 'publish/dist/config'
  copy('config', configPath)
  const serverPath = 'publish/dist/server/'
  copy('server/models', `${serverPath}models`)
  copy('server/routes', `${serverPath}routes`)
  copy('server/index.js', `${serverPath}index.js`)
  copy('server/package.json', `${serverPath}package.json`)
  copy('server/package-lock.json', `${serverPath}package-lock.json`)
  const blogPath = 'publish/dist/blog/'
  copy('blog/.nuxt', `${blogPath}.nuxt`)
  copy('blog/static', `${blogPath}static`)
  copy('blog/index.js', `${blogPath}index.js`)
  copy('blog/nuxt.config.js', `${blogPath}nuxt.config.js`)
  copy('blog/package.json', `${blogPath}package.json`)
  copy('blog/package-lock.json', `${blogPath}package-lock.json`)
}
