<template>
    <canvas ref="chart"> </canvas>
  </template>
  
  <script>
  import { Chart, registerables } from "chart.js";
  
  Chart.register(...registerables);
  
  export default {
    props: {
      label: {
        type: Array,
      },
      chartData: {
        type: Array,
      },
    },
    async mounted() {
      await new Chart(this.$refs.chart, {
        type: "bar",
        data: {
          labels: this.label,
          datasets: [
            {
              label: "Attendance",
              backgroundColor: "rgba(255, 0, 0, 1)",
              data: this.chartData,
            },
          ],
        },
        options: {
          scales: {
            y: {
              min: 0,
              max: 10
            },
          },
        },
      });
    },
  };
  </script>
  