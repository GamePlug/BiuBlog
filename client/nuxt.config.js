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
      {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: `${myConfig.client.base}/favicon.ico`}
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
    extend(config, ctx) {
    }
  },

  server: {
    host: myConfig.client.host,
    port: myConfig.client.port
  },

  router: {
    base: myConfig.client.base,
    prefetchLinks: true
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
  ** Proxy module configuration
   */
  proxy: {
    [`${myConfig.server.base}/`]: `http://${myConfig.server.host}:${myConfig.server.port}`,
    '/github': {
      target: 'https://github.com/GamePlug',
      pathRewrite: {'^/github': ''}
    },
    '/GamePlug': 'https://github.com'
  }

}
