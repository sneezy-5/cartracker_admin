<script lang="ts" setup>
import BookingTable from '@/views/pages/tables/BookingTable.vue'

</script>

<template>


<v-row class="contenair">


  <VCol cols="12">
      <VCard title="Commandes">
        <!-- <VCardText>
          You can show a dense version of the table by using the <code>density</code> prop.
        </VCardText> -->
        <BookingTable />
      </VCard>
    </VCol>
</v-row>
</template>

