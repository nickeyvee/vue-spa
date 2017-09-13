<template>
   <div class="container">
      <div class="overlay"></div>
      <div class="card">
         <h1> Redeem your prize?</h1>
         <button class="btn btn-primary" @click="onConfirmation">Yes</button>
         <button class="btn btn-danger" @click="cancel">Cancel</button>
      </div>      
   </div>
</template>

<script>
export default {
  props: ['prizeId'],
  methods: {
     cancel: function() {
        this.$emit("destroy");
     },
     onConfirmation: function() {
         console.log( this.prizeId );
         this.$http.put(`${ location.origin }/api/decrement/${ this.prizeId }`)
         .then( response => {
            return response.text();
         })
         .then( msg => {
            console.log( msg );
            this.$router.push({ path: '/'});
            this.cancel();
         });
     }
  }
}
</script>

<style scoped>
   button {
      width: 150px;
      margin: 25px;
      margin-top: 100px;
   }
   .container {
      position: absolute;
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
   .card {
      background: white;
      border-radius: 5px;
      position: relative;
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
