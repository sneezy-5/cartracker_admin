<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'

interface AnalyticCardPropType{
  ca: string
  depense: string

}
const props = withDefaults(defineProps<AnalyticCardPropType>(), {
})

const currentDate = new Date();

const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

const isoFirstDayOfMonth = firstDayOfMonth.toISOString().substr(0, 10);
const isoLastDayOfMonth = lastDayOfMonth.toISOString().substr(0, 10);


const  chartOptions = {
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: [ 'depense','chiffre d\'affaire'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          };



const series =[props.depense, props.ca]

</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Depenses et chiffre d'affaire du mois</VCardTitle>


    </VCardItem>

    <VCardText>
      <VueApexCharts
        type="pie"
        :options="chartOptions"
        :series="series"
        width="380"
        :height="220"
      />


    </VCardText>
  </VCard>
</template>
