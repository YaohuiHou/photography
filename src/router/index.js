import Vue from 'vue'
import Router from 'vue-router'
import listView from '@/view/list'
import logInView from '@/view/logIn'
import registeredView from '@/view/registered'
import contentView from '@/view/content'
import myinfoView from '@/view/my-info'
import myworksView from '@/view/my-works'
import equipmentView from '@/view/my-equipment'
import mymallView from '@/view/my-mall'
import mymessage from '@/view/my-message'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'listView',
      component: listView
    },
    {
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
    },
    {
      path: '/myworks',
      name: 'myworksView',
      component: myworksView
    },
    {
      path: '/equipment',
      name: 'equipmentView',
      component: equipmentView
    },
    {
      path: '/mymall',
      name: 'mymallView',
      component: mymallView
    },
    {
      path: '/mymessage',
      name: 'mymessage',
      component: mymessage
    }
  ]
})