import Vue from 'vue'
import Router from 'vue-router'
import Prizes from '@/components/prizes'
import Details from '@/components/details'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Prizes',
      component: Prizes
    },
   {
      path: '/details/:id',
      name: 'Details',
      component: Details
   }
  ]
})
