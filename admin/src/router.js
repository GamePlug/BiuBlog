import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/index')
    },
    {
      path: '/blog/write',
      name: 'blog-write',
      component: () => import('./views/blog/write')
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/404')
    }
  ]
})
