import pkg from './package'
const myConfig = require('../config')

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
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
  plugins: [],

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
    extend(config, ctx) {
    }
  },

  server: {
    host: myConfig.blog.host,
    port: myConfig.blog.port
  },

  router: {
    base: myConfig.blog.base
  },

  /*
  ** Axios module configuration
   */
  axios: {
    host: myConfig.server.host,
    port: myConfig.server.port,
    prefix: myConfig.server.base,
    proxy: true
  },

  /*
  ** Proxy module configurationxun
   */
  proxy: {
    '/api/**': 'http://ileichao.com',
    '/ileichao/**': {
      target: 'http://ileichao.com',
      changeOrigin: true,
      pathRewrite: {'^/ileichao': ''}
    }
  }

}
