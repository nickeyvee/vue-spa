<template>
  <div class="footer">
   <p>{{ text }}</p>
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
   p {
      color: white;
      width: 100%;
      margin: auto;
   }
</style>