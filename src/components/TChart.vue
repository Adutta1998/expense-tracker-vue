<template>
    <TrendChart
  :datasets="[
    {
      data: [10, 50, 20],
      smooth: true,
      fill: true
    }
  ]"
  :grid="{
     verticalLines: true,
     horizontalLines: true
  }"
  :labels="{
     xLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
     yLabels: 5
  }"
  :min="0">
</TrendChart>
</template>