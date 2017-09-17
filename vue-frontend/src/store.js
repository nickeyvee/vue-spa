import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
   state: {
      authState: null,
      prizes: [],
      prize: '',
      changeAuthState: function() {
         this.authState = firebase.auth().currentUser;
      }
   }
});