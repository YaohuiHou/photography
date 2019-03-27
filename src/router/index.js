import Vue from 'vue'
import Router from 'vue-router'
import logInView from '@/view/logIn'
import registeredView from '@/view/registered'
import contentView from '@/view/content'
import myinfoView from '@/view/my-info'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      name: 'logInView',
      component: logInView
    },
    {
      path: '/register',
      name: 'registeredView',
      component: registeredView
    },
    {
      path: '/content',
      name: 'contentView',
      component: contentView
    },
    {
      path: '/myinfo',
      name: 'myinfoView',
      component: myinfoView
    }
  ]
})