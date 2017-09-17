<template>
  <div id="app">
    <component :is="component" :prizeId="prizeId" v-on:destroy="destroyDialog"></component>
    <app-navbar class="amber darken-2" v-on:changedAuthState="updateAuthState"></app-navbar>
    <div class="banner amber lighten-1">
    </div>
    <router-view v-on:activateDialog="initDialog($event)"></router-view>
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
         // prizes: [],
         showDialog: false,
         component: "",
         prizeId: "",
         title: "Signup",
         authState: firebase.auth().currentUser
     }
  },
  methods: {
     initDialog: function( id ) {
       this.component = "dialog-box";
       this.prizeId = id;
      //  console.log( this.prizeId );
     },
     updateAuthState: function() {
       this.authState = firebase.auth().currentUser
    },
    getter: function() {
      let cache = [];

      this.$http.get(`${ location.origin }/api/data`)
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
      }).then( json => {
         
         const data = json.data;
         for( let i = 0; i < data.length; i++ ) {

            cache.push({
               id: data[i]._id, name: data[i].name,
               desc: data[i].description,
               quantity: data[i].quantity,              
               image_url: data[i].image_url
            })
         }
      })
         console.log( cache );
         return this.$store.state.prizes = cache;
      
    },
    destroyDialog: function() {
       let update = new Promise(( resolve, reject ) => {
         resolve( this.getter() );
       });
       update.then(() => {
          console.log( "done" );
          this.$router.push('/prizes');
       })
       this.component = "";
     }
  },
  created() {
     this.getter();
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
   height: 150px;
   width: 100%;   
}
h1, .h1 {
   height: 100%;
   font-size: 50px;
   display: table-cell;
   vertical-align: middle;
}
</style>
