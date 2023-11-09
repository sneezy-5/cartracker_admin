<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'

interface AnalyticCardPropType{
  data: any

}
const props = withDefaults(defineProps<AnalyticCardPropType>(), {
})


const options = {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: ['Semaine1', 'Semaine2', 'Semaine3', 'Semaine4', 'Semaine5'],
          tickPlacement: 'on',
          labels: { show: false },
          crosshairs: { opacity: 0 },
          axisTicks: { show: false },
          axisBorder: { show: false },
        }
      };



const series = [{ data: [props.data[0],props.data[1], props.data[2],props.data[3]] }]

</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Evolution des location du mois</VCardTitle>

      <!-- <template #append>
        <div class="me-n3">
          <MoreBtn />
        </div>
      </template> -->
    </VCardItem>

    <VCardText>
      <VueApexCharts
        type="bar"
        :options="options"
        :series="series"
        :height="220"
      />



      <!-- <VBtn block to="/inventory"   color="primary"  >
        Details
      </VBtn> -->
    </VCardText>
  </VCard>
</template>
