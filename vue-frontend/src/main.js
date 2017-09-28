// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import * as firebase from 'firebase'
import Vuetify from 'vuetify'
import {
  store
} from './store'

Vue.use(Vuetify)

Vue.config.productionTip = false;

Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
  created() {

    firebase.initializeApp({
      apiKey: "AIzaSyAYIDjWzgrNaZgZArQYutSgljJ_Nc9Uj68",
      authDomain: "razz-project.firebaseapp.com",
      databaseURL: "https://razz-project.firebaseio.com",
      projectId: "razz-project",
      storageBucket: "razz-project.appspot.com",
      messagingSenderId: "977519312818"
    });

    // ---- STORE USER AUTH STATUS WHEN APP IS CREATED ----

    this.$store.dispatch("persistLocalSession")
      .then(() => {
        this.$router.push('/prizes');
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }
})
