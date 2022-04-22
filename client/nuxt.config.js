const pkg = require('./package')
const config = require('common/config')

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: `${config.client.base}/favicon.ico`},
      {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(webConfig, ctx) {
    }
  },

  server: {
    host: config.client.host,
    port: config.client.port
  },

  router: {
    base: config.client.base,
    prefetchLinks: true
  },

  /*
  ** Axios module configuration
   */
  axios: {
    host: config.server.host,
    port: config.server.port,
    prefix: config.server.base,
    proxy: true
  },

  /*
  ** Proxy module configuration
   */
  proxy: {
    [`${config.server.base}/`]: `http://${config.server.host}:${config.server.port}`,
    [`${config.client.base}/test/`]: {
      target: `http://${config.client.host}:${config.client.port}${config.client.base}/test/index.html`,
      pathRewrite: {'^.*': ''}
    }
  }

}
