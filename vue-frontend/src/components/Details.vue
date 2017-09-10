<template>
   <div class="container">
      <div class="row-1">
         <div class="card" style="width: 54rem;">
            <img class="card-img-top" src="" alt="Card image cap">
         </div>

         <div class="card" style="width: 54rem;">
            <div class="card-block">
               <h4 class="card-title">Card title</h4>
               <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
               <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
         </div>
      </div>
      
      <hr>

      <div class="row-2">
         <h3>This is a description</h3>
      </div>
   </div>
</template>

<script>
export default {
   props: ['current'],
  
  activated() {
   console.log( this.current );
  }
}
</script>

<style scoped>
   .row-1 {
      display: flex;
      flex-wrap: wrap;
      flex-grow: 2;
   }
   .card {
      border-radius: 3px;
      background: white;
      height: 450px;
      width: 250px;
      margin: 10px;
   }
   h3, .h3 {
      text-align: center;
   }
</style>
