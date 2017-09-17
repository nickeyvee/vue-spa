import Vue from 'vue'
import Router from 'vue-router'
import Prizes from '@/components/prizes'
import Details from '@/components/details'
import Signup from '@/components/signup'
import Login from '@/components/login'
import * as firebase from 'firebase'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
     {
      path: '/',
      name: 'signup',
      component: Signup,
     },
     {
      path: '/signup',
      name: 'signup',
      component: Signup,
     },
    {
      path: '/prizes',
      name: 'Prizes',
      component: Prizes,
      beforeEnter: (to, from, next) => {

       firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
            return next();
         } else {
            return next( false );
         }
       })
      }
    },
   {
      path: '/login',
      name: 'Login',
      component: Login
   },
   {
      path: '/details/:id',
      name: 'Details',
      component: Details
   }
  ]
})
