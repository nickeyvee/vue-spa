<template>
   <div>
      <v-toolbar>
         <v-toolbar-title>
            <strong>RazzApp</strong>
         </v-toolbar-title>
         <v-spacer></v-spacer>
         <!-- <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon> -->
         <v-toolbar-items>
            <v-btn v-if="auth === null" class="item" flat to="/login">
               <v-icon dark left>lock_open</v-icon>Login
            </v-btn>
            <v-btn v-if="auth" class="item" flat @click="logout">
               <v-icon dark left>lock_outline</v-icon>Logout
            </v-btn>
            <v-btn v-if="auth === null" class="item" flat to="/signup">
               <v-icon dark left>account_circle</v-icon>Sign up
            </v-btn>
            <v-btn v-if="auth" class="item" flat to="/prizes">
               <v-icon dark left>redeem</v-icon>Prizes</v-btn>
         </v-toolbar-items>
      </v-toolbar>
   </div>
</template>

<script>
import * as firebase from 'firebase';

export default {
   computed: {
      auth: function() {
         return this.$store.state.authState
      }
   },
   methods: {
      logout() {
         this.$store.dispatch('logout')
         .then(() => {
            this.$router.push('/login');
         })
      }
   }
}
</script>

<style scoped>
.item {
   color: black;
}
</style>
