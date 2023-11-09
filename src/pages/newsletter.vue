<script lang="ts" setup>
import NewsletterTable from '@/views/pages/tables/NewsletterTable.vue'

</script>

<template>


<v-row class="contenair">


  <VCol cols="12">
      <VCard title="Newsletter">
        <!-- <VCardText>
          You can show a dense version of the table by using the <code>density</code> prop.
        </VCardText> -->
        <NewsletterTable />
      </VCard>
    </VCol>
</v-row>
</template>

