import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import VueResource from 'vue-resource'
import testData from './assets/model.js'

Vue.use(Vuex);
Vue.use(VueResource)

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
         state.authState = firebase.auth().currentUser;         
      },
      activateDialog( state ) {
        state.dialog_active = !state.dialog_active;
      },
      addMessage( state, payload ) {
         state.dialog_msg = payload.msg;
      },
      setPrizes( state, payload ) {
         console.log("setPrize commit")
         console.log( payload );

         state.prizes = payload;
      },
      setCurrentPrize( state, payload ) {
         state.prize = payload;
      }
   },
   actions: {
      filterPrizeById() {
         return this.$store.state.prizes.filter( prize => {
            if( prize.id === this.routeId ) {
               
            }
         });
         console.log( filter );
         store.commit('setCurrentPrize', filter[0] );
      },
      updatePrizeState( prizeName ) {
         store.commit('setCurrentPrize', prizeName );
      },
      fetchPrizeData() {
      let cache = [];
      Vue.http.get(`${ location.origin }/api/data`)
      .then( response => {
         return response.json();
      }, response => {
         // I will use a local object when I am not connected to my database
         // to test the rendering of data to my template.
         if ( response ) {
            for ( let prize of testData ) {
               cache.push( prize );
            }
         }
      })
      .then( json => {    
         const data = json.data;
         console.log("resolved json response");
         console.log(json.data);
         for( let i = 0; i < data.length; i++ ) {

            cache.push({
               id: data[i]._id, name: data[i].name,
               desc: data[i].description,
               quantity: data[i].quantity,              
               image_url: data[i].image_url
            })
         }
      })
      console.log( "chache of prizes" );
      console.log( cache );
      store.commit('setPrizes', cache );
      }
   }
});