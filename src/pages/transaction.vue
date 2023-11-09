<script lang="ts" setup>
import TransactionTable from '@/views/pages/tables/TransactionTable.vue'

</script>

<template>


<v-row class="contenair">


  <VCol cols="12">
      <VCard title="Transactions">
        <!-- <VCardText>
          You can show a dense version of the table by using the <code>density</code> prop.
        </VCardText> -->
        <TransactionTable />
      </VCard>
    </VCol>
</v-row>
</template>

