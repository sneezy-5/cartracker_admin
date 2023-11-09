<script lang="ts" setup>
import CarTable from '@/views/pages/tables/CarTable.vue'

</script>

<template>


<v-row class="contenair">


  <VCol cols="12">
      <VCard title="vehicules">
        <!-- <VCardText>
          You can show a dense version of the table by using the <code>density</code> prop.
        </VCardText> -->
        <CarTable />
      </VCard>
    </VCol>
</v-row>
</template>

