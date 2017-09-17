<template>
   <div>
      <!-- <h3>Signup</h3> -->
      <v-card class="form-card" style="width: 350px">
         <v-toolbar class="amber lighten-1" dark>
            <v-toolbar-title>Create an account</v-toolbar-title>
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
         <v-text-field
            type="password"
            label="verify password"
            v-model="passwordValid"
            :rules="passwordVerifyRules"
            required
         ></v-text-field>
         <v-btn @click="submit" :class="{ green: valid, red: !valid }" class="submit-btn">submit</v-btn>
      </v-form>
      </v-card>
   </div>
</template>

<script>
import * as firebase from 'firebase';

export default {
   data () {
   return {
      valid: false,
      email: '',
      password: '',
      passwordValid: '',
      emailRules: [
         (v) => !!v || 'E-mail is required',
         (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
         (v) => !!v || 'Please enter a password',
         (v) => v && v.length <= 10 || 'Password must be less than 10 characters'
      ],
      passwordVerifyRules:  [
         (v) => !!v || 'Must Verify Password',
         (v) => v && v === this.password || 'Passwords do not match'
      ]}
   },
   methods: {
      submit () {
        if ( this.valid ) {
          firebase.auth().createUserWithEmailAndPassword( this.email, this.password ).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
        }
      }
   }
}
</script>

<style scoped>
   .form-card {
      margin: 25px auto;
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
