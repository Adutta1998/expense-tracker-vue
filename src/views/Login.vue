<template>
  <div>
      <v-container>
          <h1>{{(isLogin)?"Login":"Sign Up"}}</h1>
          <v-text-field label="Name" outlined hide-details="auto" class="mb-2" v-model="credentials.name"/>
          <v-text-field v-if="!isLogin" label="Email:" type="email" outlined hide-details="auto" class="mb-2" v-model="credentials.email"/>
          <v-text-field label="Password:" type="password" outlined hide-details="auto" class="mb-2" v-model="credentials.password"/>
          <v-btn outlined color="primary" @click="auth">Submit</v-btn>
          <v-btn class="mt-16" outlined color="primary" block @click="isLogin = !isLogin">
              <span v-if="isLogin">
                  Not a user? Sign-up
              </span>
              <span v-if="!isLogin">
                  Already a user? Sign-in
              </span>
          </v-btn>
      </v-container>
  </div>
</template>

<script>
import md5 from 'md5'
export default {
    data:()=>({
        isLogin:true,
        credentials:{
            name:"",
            password:"",
            email:""
        }
    }),
    methods:{
        auth(){
            if(this.isLogin){
                this.credentials.password = md5(this.credentials.password);
                var cred = JSON.parse(JSON.stringify(this.credentials))
                this.$store.dispatch("login",cred)
            }else{
                this.credentials.password = md5(this.credentials.password);
                this.credentials["auth_id"] = md5(this.credentials.name+Date.now)
                cred = JSON.parse(JSON.stringify(this.credentials))
                this.$store.dispatch("signup",cred)
            }
        }
    }
}
</script>

<style>

</style>