<template>
   <div class="container">
      <div class="row-1">
         <div class="card img-viewport" style="width: 54rem;">
            <img class="card-img-top" v-bind:src="prize.image_url" alt="Card image cap">
         </div>

         <div class="card" style="width: 54rem;">
            <div class="card-block">
               <h3 class="card-title">{{ prize.name }}</h3>
               <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
               <div class="hr"></div>
               <a href="/"><button class="btn-redeem h3">Redeem</button></a>
               <div class="hr"></div>
               <p>Only {{ prize.quantity }} units left!</p>          
            </div>
         </div>
      </div> 
      <div class="row-2">
         <h3>This is a description</h3>
      </div>
   </div>
</template>

<script>
export default {
   props: ['prizes'],
   data() {
      return {
         routeId: "",
         prize: ""
      }
   },
   watch: {
      prizes: function() {
         for (let i = 0; i < this.prizes.length; i++ ) {
            if ( this.prizes[i].id === this.routeId ) {
               console.log( "match" );
               return this.prize = this.prizes[i];
            }
         }
      }
   },
   mounted() {
      this.routeId = location.pathname.replace("/details/", "");
   }
}
</script>

<style scoped>
   .container {
      min-height: 650px;
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
      background: #FCBD24;
      color: black;
   }
</style>
