const common = require('common')
const myConfig = common.config

module.exports = {
  publicPath: `${myConfig.client.base}${myConfig.admin.base}`,
  devServer: {
    host: myConfig.admin.host,
    port: myConfig.admin.port,
    proxy: {
      [`${myConfig.server.base}/`]: {
        target: `http://${myConfig.server.host}:${myConfig.server.port}`,
        ws: true,
        changeOrigin: true
      }
    }
  }
}
