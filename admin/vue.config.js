const config = require('common/config')

module.exports = {
  publicPath: `${config.client.base}${config.admin.base}`,
  devServer: {
    host: config.admin.host,
    port: config.admin.port,
    proxy: {
      [`${config.server.base}/`]: {
        target: `http://${config.server.host}:${config.server.port}`,
        ws: true,
        changeOrigin: true
      }
    }
  }
}
