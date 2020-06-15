<template>
  <v-container>
    <div class="d-flex align-center">
      <h1>Insert</h1>
      <v-spacer></v-spacer>
      <router-link class="nostyle mr-2" to="chart">
        <v-btn small dark rounded color="blue" title="Charts">
          <v-icon left color="white">mdi-chart-arc</v-icon> Charts
        </v-btn>
      </router-link>
      <router-link class="nostyle" to="table">
        <v-btn small dark rounded color="blue" title="Charts">
          <v-icon left color="white">mdi-table-large</v-icon> Table
        </v-btn>
      </router-link>
    </div>
    <!-- {{totalTransaction}} -->
    <v-card class="my-4 pa-4">
      <DatePicker v-on:dateChanged="setDate"/>
      <v-text-field
        hide-details="auto"
        label="Amount"
        class="mb-2"
        outlined
        v-model="payload.amount"
        prepend-inner-icon="mdi-currency-inr"
      ></v-text-field>
      <v-text-field
        hide-details="auto"
        label="Source"
        class="mb-2"
        outlined
        v-model="payload.source"
        prepend-inner-icon="mdi-source-commit-start"
      ></v-text-field>
      <div class="d-flex align-center">
        <h3>Income?</h3>
        <v-spacer></v-spacer>
        <v-switch v-model="isIncome"></v-switch>
      </div>
      <v-btn :loading="isloading" outlined color="success" class="px-4" shaped @click="saveData">Save</v-btn>
    </v-card>
    <!-- All Data Card -->
    <v-card :loading="isloading">
      <v-card-title>Transactions</v-card-title>
      <v-card-subtitle>*This Month ({{new Date().toLocaleString('default', { month: 'long' })}})</v-card-subtitle>
      <v-card-text>
        <v-list-item>
          <span class="text-body-1 font-weight-bold">Income</span>
          <v-spacer></v-spacer>
          <v-chip class="pa-4" dark color="green">
            <span class="text-subtitle-2 font-weight-bold">{{totalTransaction.tIncome}}</span>
            <v-icon right>mdi-currency-inr</v-icon>
          </v-chip>
        </v-list-item>
        <v-list-item>
          <span class="text-body-1 font-weight-bold">Expense</span>
          <v-spacer></v-spacer>
          <v-chip class="pa-4" dark color="red">
            <span class="text-subtitle-2 font-weight-bold">{{totalTransaction.tExpense}}</span>
            <v-icon right>mdi-currency-inr</v-icon>
          </v-chip>
        </v-list-item>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import DatePicker from '../components/DatePicker.vue'
export default {
  name: 'Home',
  data(){
    return{
      isIncome:false,
      payload:{
        date:"",
        amount:"",
        source:"",
      }
    }
  },
  components:{DatePicker},
  mounted(){
        this.$emit("changeView",false);
  },
  methods:{
    saveData(){
      this.payload.type = (this.isIncome == true)?"Income":"Expense"
      this.payload["id"] = new Date().toISOString()
      this.$store.dispatch("save",JSON.parse(JSON.stringify(this.payload)))
    },
    setDate(val){
      
      // console.log(val)
      this.payload.date = val
    },
    filterDate(d){
        let dt = d.date
        dt = parseInt(dt.split("-")[1])
        return (dt == new Date().getMonth() + 1)
      },
  },
  computed:{
    isloading(){
      return this.$store.state.loading
    },
    totalTransaction(){
      let dataI = this.$store.state.income
      let dataE = this.$store.state.expense
      let tIncome = 0,tExpense = 0
      if(dataI && dataE){
        dataI = dataI.filter(this.filterDate)
        dataE = dataE.filter(this.filterDate)

        dataI.forEach(element => {
          tIncome+=parseInt(element.amount)
        })

        dataE.forEach(element => {
          tExpense+=parseInt(element.amount)
        });
      }
      return {tIncome,tExpense}
    }
  }
}
</script>

<style scoped>
.nostyle{
  text-decoration: none !important;
}
</style>
