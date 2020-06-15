<template>
  <v-container>
    <MonthPicker v-on:monthChanged="setMonth"/>
    <h3>Data-Tables</h3>
    <v-card class="mb-4">
        <v-card-title class="green lighten-1 white--text">Income</v-card-title>
        <div v-if="Tran">
          <v-data-table
            :headers="headers"
            :items="Tran[0]"
            :items-per-page="5"
          >
          </v-data-table>
        </div>
    </v-card>

    <v-card>
        <v-card-title class="red lighten-1 white--text">Expense</v-card-title>
        <v-data-table
            :headers="headers"
            :items="Tran[1]"
            :items-per-page="3"
        ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import MonthPicker from "../components/MonthPicker.vue"
export default {
    name:"Tables",
    components:{
        MonthPicker
    },
    mounted(){
        this.$emit("changeView",true);
    },
    data () {
      return {
        month:"",
        headers: [
          { text: 'Date', value: 'date',},
          { text: 'Amount', value: 'amount' },
          { text: 'Source', value: 'src' },
        ],
      }
    },
    methods:{
      filterDate(d){
        let dt = d.date
        dt = parseInt(dt.split("-")[1])
        if(this.month == ""){
          return (dt == new Date().getMonth() + 1)
        }else{
          let chkdate = parseInt(this.month.split("-")[1])
          return (dt == chkdate)
        }
      },
      setMonth(val){
        this.month = val
      }
    },
    computed:{
        Tran(){
            let inc = this.$store.state.income
            let exp = this.$store.state.expense

            inc = inc.filter(this.filterDate)
            exp = exp.filter(this.filterDate)

            return [inc,exp]
        },
    }
}
</script>

<style>

</style>