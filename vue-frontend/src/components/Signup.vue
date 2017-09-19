<template>
   <div>
      <v-card class="form-card" style="width: 350px">
         <v-toolbar class="amber lighten-1" dark>
            <v-toolbar-title>Sign up</v-toolbar-title>
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

         <v-alert v-if="errorCode" error value="true">
            <p>{{ errorMessage }}</p>
         </v-alert>

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
      errorCode: null,
      errorMessage: '',
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
      activateDialog: function( error ) {
         this.$store.state.dialog_state = "error";
         this.$emit('activateDialog', { msg: error });
      },
      submit () {
        if ( this.valid ) {
          this.errorCode = null;
          firebase.auth().createUserWithEmailAndPassword( this.email, this.password )
          .then( response => {
             if( response ) {
               // console.log("success");
               this.$store.commit('setAuthState');        
               this.$router.push('/prizes');  
               // this.$store.dispatch('fetchAuthState', this.$router.push('/prizes'));
             }
          })
          .catch( error => {
            this.errorCode = error.code;
            this.errorMessage = error.message;
          });
        }
      }
   },
   mounted() {
      this.$store.state.title = "Create a new account"
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
