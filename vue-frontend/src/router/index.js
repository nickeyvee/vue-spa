import Vue from 'vue'
import Router from 'vue-router'
import Prizes from '@/components/prizes'
import Details from '@/components/details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Prizes',
      component: Prizes
    },
   {
      path: '/details',
      name: 'Details',
      component: Details
   }
  ]
})
