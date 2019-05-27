const fs = require('fs')
const path = require('path')
const myConfig = require('../config')
const root = '../'
const adminPath = `client/static/${myConfig.admin.base}`
const releasePath = 'publish/dist'

switch (process.env.PUBLISH_ENV) {
  case 'clear':
    clear(adminPath)
    clear(releasePath)
    break
  case 'admin':
    clear(adminPath)
    copy('admin/dist', adminPath)
    break
  case 'release':
    clear(releasePath)
    copy('config', `${releasePath}/config`)
    copy('server', `${releasePath}/server`)
    copy('client', `${releasePath}/client`)
    break
}

function clear(src) {
  deleteSync(root + src)
}

function copy(src, dst) {
  copySync(root + src, root + dst)
}

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

function mkdirsSync(src) {
  if (fs.existsSync(src)) {
    return true
  }
  if (mkdirsSync(path.dirname(src))) {
    fs.mkdirSync(src)
    return true
  }
}
