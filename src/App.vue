<template>
  <v-app>
    <v-card
    color="indigo"
    flat
  >
    <v-toolbar color="primary" dark>
      <router-link to="/" v-if="notIsHome" class="mr-2">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </router-link>
      <v-toolbar-title>Expense Tracker</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outlined v-if="loggedIn!=null" @click="logout">Logout<v-icon right>mdi-logout-variant</v-icon></v-btn>
    </v-toolbar>
  </v-card>

    <v-main>
      <router-view v-on:changeView="viewChanged" />
    </v-main>
  </v-app>
</template>

<script>
// import md5 from 'md5'
export default {
  name: 'App',
  data(){
    return{
      notIsHome:false
    }
  },
  methods:{
    viewChanged(arg){
      this.notIsHome = arg
    },
    logout(){
      // console.log(document.cookie);
      document.cookie = "cred=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      console.log(document.cookie);
      this.$store.state.credentials = null
    }
  },
  created(){
    this.$store.commit('checkLogin')
  },
  mounted(){
    // this.$store.dispatch("fetch_expense")
    if(this.loggedIn == null){
      this.$router.push("/login")
    }
  },
  watch:{
    loggedIn(val){
      if(val != null){
        this.$router.replace("/")
        this.$store.dispatch("fetch_income"),
        this.$store.dispatch("fetch_expense")
      }else{
        this.$router.push("/login")
      }
    }
  },
  computed:{
    loggedIn(){
      return this.$store.state.credentials;
    }
  }
};
</script>

<style>
.Income.curve > path.fill{
  fill: rgba(76,175,80,.65)
}
.Expense.curve > path.fill{
  fill: rgba(255,82,82,.65)
}
</style>
