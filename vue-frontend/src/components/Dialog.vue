<template>
   <div class="wrapper">
      <div class="overlay"></div>
      <div class="card">

       <div v-if="this.$store.state.dialog_state ==='error'">
         <h2>{{ errorMsg }}</h2>
      </div> 

      <div v-if="this.$store.state.dialog_state ==='redeem'">
         <div class="card-item" v-if="!response">
            <h2>Redeem item?</h2>
            <div class="hr"></div>
            <p class="card-title">{{ this.$store.state.prize.name }}</p>
            <p>x 1</p>
            <div class="hr"></div>            
            <v-btn class="btn half btn-primary btn-lg" @click="onConfirmation">Yes</v-btn>
            <v-btn class="btn half btn-danger btn-lg" @click="destroy">Cancel</v-btn>
         </div>

         <div class="card-item" v-else-if="response">
            <h3>{{ message }}</h3>
            <div class="hr"></div>
            <v-btn type="button" class="btn btn-warning btn-lg btn-block" @click="destroy">Continue</v-btn>
         </div>
      </div>

      </div>    
   </div>
</template>

<script>
export default {
  props: ['prizeId', 'errorMsg'],
  data() {
     return {
         response: false,
         message: ""
     }
  },
  methods: {
     destroy: function() {
        console.log("continue");
        console.log( this.$store.state.prizes );
        this.$emit("destroy");
     },
     onConfirmation: function() {
         this.$http.put(`${ location.origin }/api/decrement/${ this.prizeId }`)
         .then( response => {
            console.log( response );
            return response.text();
         })
         .then( msg => {
            this.response = true;
            this.message = msg;

            this.$store.dispatch('fetchPrizeData');
            console.log( this.$store.state.prizes );
         })
         .catch( error => {
            console.log( error );
         });
     }
  }
}
</script>

<style scoped>
   h2, .h2 {
      font-size: 25px;
      padding: 20px;
   }
   .half {
      width: 45%;
      margin: 20px auto;
   }
   .hr {
      border-radius: 50%;
      background: #E9E9E9;
      margin: 10px auto;
      height: 2px;
      width: 85%;
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
      position: sticky;
      width: 450px;
      margin-left: auto;
      margin-right: auto;
      cursor: pointer;
      z-index: 99;
      top: 20%;
      right: 0;      
      left: 0;
   }
</style>
