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
    </v-toolbar>
  </v-card>

    <v-main>
      <router-view v-on:changeView="viewChanged" />
    </v-main>
  </v-app>
</template>

<script>

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
      console.log(arg)
    }
  },
  mounted(){
    this.$store.dispatch("fetch_income"),
    this.$store.dispatch("fetch_expense")
  }
};
</script>
