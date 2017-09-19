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
         path: '/login',
         name: 'Login',
         component: Login
    },
    {
      path: '/prizes',
      name: 'Prizes',
      component: Prizes,
      beforeEnter: (to, from, next) => {

       firebase.auth().onAuthStateChanged( user =>  {
         //  console.log( user );        
         if (user) {
            return next();
         } else {
            return next('/login');            
         }
       })
      }
    },
   {
      path: '/details/:id',
      name: 'Details',
      component: Details,
      beforeEnter: (to, from, next) => {

       firebase.auth().onAuthStateChanged(function(user) {
         //  console.log( user );
         if (user) {
            return next();
         } else {
            return next({path: '/login'});
         }
       })
      }
   }
  ]
})
