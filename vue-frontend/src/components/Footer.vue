<template>
  <div class="footer">
   <h3>{{ text }}</h3>
  </div>
</template>

<script>
export default {
   data() {
      return {
         text: "Copyright © 2017 Nick Vorraso"
      }
   }
}
</script>

<style scoped>
   .footer {   
      left: 0;
      bottom: 0;  
      width: 100%;
      height: 175px;
      position: relative;
      background: black;
      margin: 0 auto;
   }
   h3 {
      color: white;
      text-align: center;
      padding: 50px;
   }
</style>