<template>
  <div id="app">
    <component :is="component" :prizeId="prizeId" v-on:destroy="destroyDialog"></component>
    <div class="banner">
       <h1>A Gigantic Banner</h1>
    </div>
    <router-view :prizes="prizes" v-on:activateDialog="initDialog($event)"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import testData from './assets/model.js'
import Footer from './components/footer.vue';
import Details from './components/details.vue';
import Dialog from './components/dialog.vue';

export default {
   components: {
      'app-footer': Footer,
      'dialog-box': Dialog
   },
   data() {
     return {
         prizes: [],
         showDialog: false,
         component: "",
         prizeId: ""
     }
  },
  methods: {
     initDialog: function( id ) {
       this.component = "dialog-box";
       this.prizeId = id;
     },
     destroyDialog: function() {
       this.component = "";
     }
  },
  created() {
     
   this.$http.get(`${ location.origin }/api/data`)
   .then( response => {
      return response.json();
   }, response => {
      // I will use a local object when I am not connected to my database
      // to test the rendering of data to my template.
      if ( response ) {
         for ( let prize of testData ) {
            this.prizes.push( prize );
         }
      return;
      }
   }).then( json => {
      
      const data = json.data;
      for( let i = 0; i < data.length; i++ ) {

         this.prizes.push({
            id: data[i]._id, name: data[i].name,
            desc: data[i].description,
            quantity: data[i].quantity,              
            image_url: data[i].image_url
         })
       }
   })
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
   height: 250px;
   width: 100%;   
}
h1, .h1 {
   height: 100%;
   font-size: 50px;
   display: table-cell;
   vertical-align: middle;
}
</style>
