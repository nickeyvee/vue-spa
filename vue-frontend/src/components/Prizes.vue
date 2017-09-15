<template>
   <div>
      <h1>Redeem your prize!</h1>
      <div class="container">
         <div class="card prize" v-for="prize in prizes" v-bind:key="prize.id" style="width: 35rem;">
            <div class="img-viewport">
               <img class="card-img-top" v-bind:src="prize.image_url" alt="Card image cap">       
            </div>
            <div class="card-block">
               <h3 class="card-title">{{ prize.name }}</h3>
               <p class="card-text"></p>
               <a v-bind:href="selectedCurrentVal"><button class="h3" @click="getCurrent( prize )">Redeem <i class="glyphicon glyphicon-menu-right"></i></button></a>
            </div>
         </div>
      </div>
   </div>
</template>

<script>

export default {
  props: ['prizes'],
  data() {
      return {
         selectedCurrentVal: ""
      }
  },
  methods: {
     getCurrent: function( el ) {
        this.selectedCurrentVal = `/details/${ el.id }`;
     }
  }
}
</script>

<style scoped>
   .container {
      display: flex;
      flex-wrap: wrap;
      flex-grow: 2;      
   }
   .prize {
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
   button {
      background: black;
      border: none;
      color: white;
      width: 100%;
      height: 80px;
      margin: 0;
   }
   button:hover {
      transition: 0.2s;
      background: #FCBD24;
      color: black;
   }
   .card-title {
      padding: 30px;
      margin: 0;
   }
   h1, .h1 {
      padding: 50px;
   }
   h3, .h3 {
      font-size: 20px;
   }
</style>