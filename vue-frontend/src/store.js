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
    imageChache: [],
    prizes: null,
    prize: null,
  },
  mutations: {
    setAuthState(state, payload) {
      state.authState = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.authState = user;
        } else {
         //  console.log('No user is signed in');
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
        store.commit('setAuthState');
      });
    },
    fetchAuthState(payload) {
      store.commit('setAuthState');
      payload;
    },
    persistLocalSession() {
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
      return Vue.http.get(`${ location.origin }/api/data`)
        .then(response => {
          return response.json();
        })
        .then(json => {
          // console.log("resolved json response");
          // console.log(json.data);
          const newImage = new Image(450,300);
          const mapped = json.data.map(prize => {
            return {
              id: prize._id,
              name: prize.name,
              desc: prize.description,
              quantity: prize.quantity,
              image_url: newImage.scr = prize.image_url
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
    },
    preloadImages() { 
       store.commit('getImageUrls');
    }
  }
});
