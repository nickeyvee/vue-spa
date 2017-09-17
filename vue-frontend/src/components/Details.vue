<template>
   <div class="container">
      <div class="row-1">
         <!-- <div class="card img-viewport" style="width: 40rem;">
            <img class="card-img-top" v-bind:src="prize.image_url" alt="Card image cap">
         </div> -->
         <v-card style="width: 40rem;">
            <v-card-media v-bind:src="prize.image_url" height="100%">
            </v-card-media>
         </v-card>

         <div class="card" style="width: 40rem;">
            <div class="card-block">
               <h3 class="card-title">{{ prize.name }}</h3>
               <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
               <div class="hr"></div>
               <button class="btn-redeem h3" @click="onRedeem">Redeem</button>
               <div class="hr"></div>
               <p>Only {{ prize.quantity }} units left!</p>          
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
   // props: ['prizes'],
   computed: {
      prize: function() {
         return this.$store.state.prize;
      }
   },
   data() {
      return {
         routeId: ""
         // prize: ""
      }
   },
   // watch: {
   //    prizes: function() {
   //       // for (let i = 0; i < this.prizes.length; i++ ) {
   //       //    if ( this.prizes[i].id === this.routeId ) {
   //       //       return this.prize = this.prizes[i];
   //       //    }
   //       // }
   //       console.log( this.prize );
   //       return this.prize.id;
   //    }
   // },
   mounted() {
      this.routeId = location.pathname.replace("/details/", "");
      // console.log( this.$store.state.prize );
   },
   methods: {
      onRedeem: function() {
         console.log( this.routeId );
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
   .btn-redeem:hover {
      transition: 0.2s;
      background: #FFCA28;
      color: black;
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
