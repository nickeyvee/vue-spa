<template>
   <div class="container">
      <div class="row-1">
         <v-card style="width: 40rem;">
            <v-card-media v-bind:src="this.$store.state.prize.image_url" height="100%">
            </v-card-media>
         </v-card>
         <div class="card" style="width: 40rem;">
            <div class="card-block">
               <h3 class="card-title">{{ this.$store.state.prize.name }}</h3>
               <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
               <div class="hr"></div>
               <v-btn class="btn-redeem h3" @click="onRedeem"
                  :class="{ red: !valid }" :disabled="!valid" >Redeem</v-btn>
               <div class="hr"></div>
               <p>Available: {{ this.$store.state.prize.quantity }}</p>        
            </div>
         </div>
      </div> 
      <div class="row-2">
         <v-btn to="/prizes" class="back"><i class="glyphicon glyphicon-chevron-left"></i></v-btn>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         routeId: ''
      }
   },
   computed: {
      valid() {
         return this.$store.state.prize.quantity > 0 ? true : false;
      }
   },
   mounted() {
      this.routeId = location.pathname.replace("/details/", "");
   },
   methods: {
      onRedeem: function() {
         this.$store.state.dialog_state = "redeem";
         this.$emit('activateDialog', this.routeId );
      }
   }
}
</script>

<style scoped>
   a {   
      text-decoration: none;
   }
   .container {
      position: relative;
      min-height: 650px;
      z-index: 1;
   }
   .hr {
      border-radius: 50%;
      background: #E9E9E9;
      margin: 10px auto;
      height: 2px;
      width: 85%;
   }
   .row-1 {
      display: flex;
      flex-wrap: wrap;
      flex-grow: 2;
   }
   .card {
      border-radius: 3px;
      background: white;
      min-height: 300px; 
      width: 250px;
      margin: 10px auto;
      margin-top: 50px;
   }
   .card-text {
      padding: 50px;
   }
   h3, .h3 {
      font-size: 20px;
      text-align: center;
   }
   .img-viewport {
      overflow: hidden;
   }
   img {
      width: 100%;
   }
   .btn-redeem {
      width: 65%;
      height: 50px;
      background: black;
      color: white;
      border-radius: 3px;
      border: none;
      margin: 20px auto;
   }
   .back {
      margin: 50px;
      color: white;
      width: 100px;
      height: 100px;
      background: black;
      border-radius: 50%;
      padding: 15px;
      font-size: 55px;
      border: none;
   }
</style>
