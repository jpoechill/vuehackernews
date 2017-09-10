import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Comments from '@/components/Comments'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/:page',
      component: Main
    },
    {
      path: '/user/:username',
      component: User
    },
    {
      path: '/:page/:id',
      component: Comments
    }
  ]
})
