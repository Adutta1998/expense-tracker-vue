<template>
  <v-container>
      <MonthPicker />
      <TChart />
  </v-container>
</template>

<script>
import MonthPicker from '../components/MonthPicker.vue'
import TChart from "../components/TChart.vue";
export default {
    components:{MonthPicker,TChart},
    mounted(){
        this.$emit("changeView",true);
    }
}
</script>

<style>

</style>