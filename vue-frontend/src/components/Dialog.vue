<template>
   <div class="wrapper">
      <div class="overlay"></div>
      <div class="card">
         <div class="card-item" v-if="!response">
            <h2>Redeem your prize?</h2>
            <v-btn class="btn half btn-primary btn-lg" @click="onConfirmation">Yes</v-btn>
            <v-btn class="btn half btn-danger btn-lg" @click="destroy">Cancel</v-btn>
         </div>

         <div class="card-item" v-else-if="response">
            <h2>{{ message }}</h2>
            <v-btn type="button" class="btn btn-warning btn-lg btn-block" @click="destroy">Continue</v-btn>
         </div>
      </div>      
   </div>
</template>

<script>
export default {
  props: ['prizeId'],
  data() {
     return {
         response: false,
         message: ""
     }
  },
  methods: {
     destroy: function() {
        this.$emit("destroy");
     },
     onConfirmation: function() {
        console.log( this.prizeId );
         this.$http.put(`${ location.origin }/api/decrement/${ this.prizeId }`)
         .then( response => {
            console.log( response.text() );
            return response.text();
         })
         .then( msg => {
            this.response = true;
            this.message = msg;
         });
     }
  }
}
</script>

<style scoped>
   h1, .h1 {
      padding: 50px;
   }
   .half {
      width: 45%;
      margin: 20px auto;
      margin-top: 100px;
   }
   .wrapper {
      position: absolute;
      margin: 0 auto;
      width: 100%;
      height: 100%;
      z-index: 50;
      padding: 0;           
   }
   .overlay {
      background: black;   
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.8;
      z-index: 89;     
   }
   .card-item {
      padding: 30px;
      width: 100%;
   }
   .card {
      background: white;
      border-radius: 5px;
      position: relative;
      display: table;
      height: 350px;     
      width: 600px;
      margin-left: auto;
      margin-right: auto;
      cursor: pointer;
      z-index: 99;
      top: 25%;
      right: 0;      
      left: 0;
   }
</style>
