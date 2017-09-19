<template>
   <div class="container">
      <v-card class="prize" v-for="prize in prizes" v-bind:key="prize.id" style="width: 32rem;">
         <v-card-media v-bind:src="prize.image_url" height="300px">
         </v-card-media>

         <v-card-text>
            <h3 class="card-title">{{ prize.name }}</h3>
            <p class="card-text"></p>
         </v-card-text>
         <v-btn class="h3 button" @click="getCurrent( prize )">Redeem <i class="glyphicon glyphicon-menu-right"></i></v-btn>            
      </v-card>
   </div>
</template>

<script>

export default {
  computed: {
     prizes: function() {
         return this.$store.state.prizes
     }
  },
  methods: {
     getCurrent: function( el ) {
      //   console.log("redeem clicked");   
      //   console.log( el );
        this.$store.commit('setCurrentPrize', el );
        this.$router.push(`/details/${ el.id }`);
     }
  },
  mounted() {
      // console.log('mounted prizes vue');
      this.$store.state.title = "Catalogue"
  }
}
</script>

<style scoped>
   .container {
      display: flex;
      flex-wrap: wrap;
      flex-grow: 2;
      width: 90%;  
   }
   .prize {
      min-width: 280px;
      overflow: hidden;
      border-radius: 3px;
      background: white;
      margin: 10px auto;
   }
   .img-viewport {
      overflow: hidden;
      height: 200px;
      margin: auto;
   }
   img {
      width: 100%;
   }
   .button {
      background: black;
      border: none;
      color: white;
      width: 100%;
      height: 80px;
      margin: 0;
   }
   button:hover {
      transition: 0.2s;
      background: #FFCA28;
      color: black;
   }
   .card-title {
      padding: 30px;
      margin: 0;
   }
   .card-text {
      padding: 0;
   }
   h1, .h1 {
      padding: 50px;
   }
   h3, .h3 {
      font-size: 20px;
   }
</style>