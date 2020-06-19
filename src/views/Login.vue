<template>
  <div>
      <v-container>
          <h1>Login</h1>
          <v-text-field label="Name" outlined hide-details="auto" class="mb-2"/>
          <v-text-field v-if="!isLogin" label="Email:" type="email" outlined hide-details="auto" class="mb-2"/>
          <v-text-field label="Password:" type="password" outlined hide-details="auto" class="mb-2"/>
          <v-btn outlined color="primary">Submit</v-btn>
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
export default {
    data:()=>({
        isLogin:true
    })
}
</script>

<style>

</style>