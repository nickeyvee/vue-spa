<template>
<div>
  <v-toolbar>
   <v-toolbar-title><strong>RazzApp</strong></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-if="auth === null" class="item" flat to="/login">Login</v-btn>
      <v-btn v-if="auth" class="item" flat @click="logout">Logout</v-btn>
      <v-btn v-if="auth === null" class="item" flat to="/signup">Signup</v-btn>
      <v-btn v-if="auth" class="item" flat to="/prizes">Prizes</v-btn>
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
      firebase.auth().signOut().then(() => {
         console.log('logged out');
         this.$store.state.authState = firebase.auth().currentUser;
         this.$router.push('/login');                             
      }, function(error) {
         console.log( error );
      });
    }
 }
}
</script>

<style scoped>
   .item {
      color: black;
   }
</style>
