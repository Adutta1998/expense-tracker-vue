<template>
  <v-container>
      <MonthPicker v-on:monthChanged="setMonth"/>
      <TChart :data = Tran[0] type="Income" />
      <TChart :data = Tran[1] type="Expense"/>

  </v-container>
</template>

<script>
import MonthPicker from '../components/MonthPicker.vue'
import TChart from "../components/TChart.vue";
export default {
    components:{MonthPicker,TChart},
    data:()=>({
        month:""
    }),
    mounted(){
        this.$emit("changeView",true)
    },
    methods:{
        comparator(a,b){
            if(a.date>b.date)
                return 1
            if(a.date<b.date)
                return -1
            return 0
        },
        setMonth(val){
            this.month = val
        },
        filterDate(d){
            let dt = d.date
            dt = parseInt(dt.split("-")[1])
            if(this.month == ""){
            return (dt == new Date().getMonth() + 1)
            }else{
            let chkdate = parseInt(this.month.split("-")[1])
            return (dt == chkdate)
            }
        }
    },
    computed:{
        Tran(){
            let inc = this.$store.state.income
            let exp = this.$store.state.expense

            inc = inc.filter(this.filterDate)
            exp = exp.filter(this.filterDate)

            exp.sort(this.comparator)
            inc.sort(this.comparator)

            inc = inc.map(d=>({
                date:d.date,
                value:d.amount
            }))

            exp = exp.map(d=>({
                date:d.date,
                value:d.amount
            }))

            // inc = inc.filter(this.filterDate)
            // exp = exp.filter(this.filterDate)
            return [inc,exp]
        },
    }
}
</script>

<style>

</style>