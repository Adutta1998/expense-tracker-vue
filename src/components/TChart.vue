<template>
    <div>
      <v-alert type="error" v-if="data.length < 2">
        {{type}} charts Can't load with only one or no data. Please insert at least two to view the chart.
        <router-link class="nostyle" to="/">
          <v-btn outlined title="Charts">
            <v-icon left>mdi-home</v-icon> Home
          </v-btn>
        </router-link>
      </v-alert>
      <v-card class="mb-8">
        <v-card-title class="blue white--text">{{type}}</v-card-title>
        <TrendChart v-if="data.length >= 2" class="test"
          style="height:200px"
          v-on:mouse-move="mouseMove"
          :datasets="[
            {
              data: data,
              smooth: true,
              fill: true,
              className:type,
              showPoints:true
            }
          ]"
          :grid="{
            horizontalLines: true,
            verticalLines:true
          }"
          :labels="{
            yLabels: 0
          }"
          :min="0"
          :interactive="true"
          >
        </TrendChart>
        <v-card-text v-if="selectedOption">
          <span class="mb-2">Date:{{selectedOption.data[0].date}}</span>
          <br> 
          <span>Amount:{{selectedOption.data[0].value}}</span>
        </v-card-text>
</v-card>
    </div>
</template>
<script>
export default {
  props:["data","type"],
  data:()=>({
    selectedOption:null
  }),
  methods:{
    mouseMove(args){
      console.log(args);
      this.selectedOption = args
    }
  }
}
</script>