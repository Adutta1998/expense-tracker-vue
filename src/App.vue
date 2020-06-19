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
    }
  },
  mounted(){
    this.$store.dispatch("fetch_income"),
    this.$store.dispatch("fetch_expense")
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
