<template>
  <div id="app">
    <router-view v-bind:prizes="prizes"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import testData from './assets/model.js'
import Footer from './components/Footer.vue';

export default {
   components: {
      'app-footer': Footer
   },
   data() {
     return {
         prizes: []         
     }
  },
  created() {
     
   this.$http.get(`${ location.origin }/data`)
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
            _id: i, name: data[i].name,
            desc: data[i].description,
            quantity: data[i].quantity,              
            image_url: data[i].image_url
          })
       }
       console.log( typeof this.prizes );
   })
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
