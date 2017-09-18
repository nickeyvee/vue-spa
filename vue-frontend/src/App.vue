<template>
  <div id="app">
    <component :is="component" :prizeId="prizeId" v-on:destroy="destroyDialog" ></component>
    <app-navbar class="amber darken-2" v-on:changedAuthState="updateAuthState"></app-navbar>
    <div class="banner amber lighten-1">
       <h2>{{ this.$store.state.title }}</h2>
    </div>
    <router-view v-on:activateDialog="initDialog($event)" v-on:updatePrizes="getPrizes()"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Navbar from './components/navbar.vue';
import testData from './assets/model.js'
import Footer from './components/footer.vue';
import Details from './components/details.vue';
import Dialog from './components/dialog.vue';
import * as firebase from 'firebase';

export default {
   components: {
      'app-navbar': Navbar,
      'app-footer': Footer,
      'dialog-box': Dialog
   },
   data() {
     return {
         errorMsg: '',
         showDialog: false,
         component: "",
         prizeId: "",
         title: "Signup",
         authState: firebase.auth().currentUser
     }
  },
  methods: {
     initDialog: function( id ) {
       this.prizeId = id;
       this.component = "dialog-box";      
     },
     updateAuthState: function() {
       this.authState = firebase.auth().currentUser
    },
    destroyDialog: function() {
      //  let update = new Promise(( resolve, reject ) => {
      //    resolve( this.getPrizes() );
      //  });
      //  update.then( val => {
      //     console.log( val );
      //     console.log( this.$store.state.prizes );
      //     this.$router.push('/prizes');
      //  })
       this.component = "";
       this.$router.push('/prizes');       
     }
  },
  created() {
     this.$store.dispatch('fetchPrizeData');
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Heebo');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  text-align: center;
  color: #2c3e50;
}
.banner {
   display: table;
    background: #FCBD24; 
   font-family: 'Heebo', sans-serif;
   height: 125px;
   width: 100%;   
}
h1, .h1 {
   height: 100%;
   font-size: 50px;
   display: table-cell;
   vertical-align: middle;
}
</style>
