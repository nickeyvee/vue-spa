import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import VueResource from 'vue-resource'
import testData from './assets/model.js'
import Router from 'vue-router'

Vue.use(Vuex);
Vue.use(Router);
Vue.use(VueResource);

export const store = new Vuex.Store({
   state: {
      authState: null,
      title: 'Create a new account',
      dialog_active: false,
      dialog_state: 'redeem',
      dialog_msg: '',
      prizes: null,
      prize: null,
   },
   mutations: {
      setAuthState( state ) {
         // console.log("setAuthState");
         state.authState = firebase.auth().currentUser;            
      },
      activateDialog( state ) {
        state.dialog_active = !state.dialog_active;
      },
      addMessage( state, payload ) {
         state.dialog_msg = payload.msg;
      },
      setPrizes( state, payload ) {
         // console.log("setPrizes commit")
         state.prizes = payload;
      },
      setCurrentPrize( state, payload ) {
         state.prize = payload;
      }
   },
   actions: {
      fetchAuthState( payload ) {
         store.commit('setAuthState');
         payload;
      },
      updatePrizeState( prizeName ) {
         store.commit('setCurrentPrize', prizeName );
      },
      fetchPrizeData() {
         let cache = [];
         Vue.http.get(`${ location.origin }/api/data`)
         .then( response => {
            return response.json();
         })
         .then( json => {
            // console.log("resolved json response");
            // console.log(json.data);
            const mapped = json.data.map( prize => {
               return {
                  id: prize._id, name: prize.name,
                  desc: prize.description,
                  quantity: prize.quantity,
                  image_url: prize.image_url
               }
            })
            store.commit('setPrizes', mapped );       
         })
         .catch( error => {
            if (error) {
               store.commit('setPrizes', testData );                   
               console.log( error );
            }
         })
      }
   }
});