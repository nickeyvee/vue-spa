import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import VueResource from 'vue-resource'
import testData from './assets/model.js'
import router from 'vue-router'

Vue.use(Vuex);
Vue.use(router);
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
    setAuthState(state, payload) {
      state.authState = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user);
          this.authState = user;
        } else {
          console.log('No user is signed in');
          state.authState = user;
        }
      });
    },
    activateDialog(state) {
      state.dialog_active = !state.dialog_active;
    },
    addMessage(state, payload) {
      state.dialog_msg = payload.msg;
    },
    setPrizes(state, payload) {
      state.prizes = payload;
    },
    setCurrentPrize(state, payload) {
      state.prize = payload;
    }
  },
  actions: {
    login( state, payload ) {     
      return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          store.commit('setAuthState');
        });
    },
    logout() {
      return firebase.auth().signOut().then(() => {
        console.log('signed out')
        store.commit('setAuthState');
      });
    },
    fetchAuthState(payload) {
      store.commit('setAuthState');
      payload;
    },
    persistLocalSession() {
      console.log('invoked action persistSession')
      return new Promise((reject, resolve) => {
          resolve(store.commit('setAuthState'));
        })
        .catch(err => {
          if (err) {
            console.log(err);
          }
        });
    },
    updatePrizeState(prizeName) {
      store.commit('setCurrentPrize', prizeName);
    },
    fetchPrizeData() {
      let cache = [];
      Vue.http.get(`${ location.origin }/api/data`)
        .then(response => {
          return response.json();
        })
        .then(json => {
          // console.log("resolved json response");
          // console.log(json.data);
          const mapped = json.data.map(prize => {
            return {
              id: prize._id,
              name: prize.name,
              desc: prize.description,
              quantity: prize.quantity,
              image_url: prize.image_url
            }
          })
          store.commit('setPrizes', mapped);
        })
        .catch(error => {
          if (error) {
            store.commit('setPrizes', testData);
            console.log(error);
          }
        })
    }
  }
});
