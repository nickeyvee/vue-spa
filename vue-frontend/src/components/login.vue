<template>
   <div>
      <v-card class="form-card" style="width: 350px">
         <v-toolbar class="amber lighten-1" dark>
            <v-toolbar-title>Login</v-toolbar-title>
         </v-toolbar>
         <v-form class="form" v-model="valid">
            <v-text-field
               label="E-mail"
               v-model="email"
               :rules="emailRules"
               required
            ></v-text-field>
            <v-text-field
               type="password"
               label="password"
               v-model="password"
               :rules="passwordRules"
               required
            ></v-text-field>
            <v-btn @click="submit" :class="{ green: valid, red: !valid }" class="submit-btn">submit</v-btn>
         </v-form>

         <v-alert v-if="errorCode" error value="true">
            <p>{{ errorMessage }}</p>
         </v-alert>
      </v-card>
   </div>
</template>

<script>
import * as firebase from 'firebase';
import router from 'vue-router';

export default {
   data () {
   return {
      valid: false,
      email: '',
      password: '',
      errorCode: null,
      errorMessage: '',
      emailRules: [
         (v) => !!v || 'E-mail is required',
         (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
         (v) => !!v || 'Please enter a password'
      ]}
   },
   computed: {
      auth: function() {
         // console.log( "auth state computed" );
         return firebase.auth().currentUser;
      }
   },
   methods: {
      activateDialog: function() {
         this.$emit('activateDialog', this.routeId );
      },
      updateState() {
         this.$emit("changeAuthState");
         console.log( this.$store.state.authState );
      },
      navigate() {
         this.$router.push('/prizes');
      },
      submit() {
         if( this.valid ) {
            firebase.auth().signInWithEmailAndPassword( this.email, this.password )
            .then(() => {
               console.log( "success" );
               this.$store.commit('setAuthState');        
               this.$router.push('/prizes');                             
            })
            .catch( error => {
               this.errorCode = error.code;
               this.errorMessage = error.message;
            });
         }
      }
   },
   mounted() {
      this.$store.state.title = "Login to your account"
   }
}
</script>

<style scoped>
   .form-card {
      margin: 50px auto;
      background: white;
   }
   .form {
      padding: 20px;
   }
   .submit-btn {
      width: 100%;
      margin: 0 auto;
   }
</style>
