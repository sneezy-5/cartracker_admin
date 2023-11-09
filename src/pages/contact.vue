<script lang="ts" setup>
import ContactTable from '@/views/pages/tables/ContactTable.vue'

</script>

<template>


<v-row class="contenair">


  <VCol cols="12">
      <VCard title="Messages">
        <!-- <VCardText>
          You can show a dense version of the table by using the <code>density</code> prop.
        </VCardText> -->
        <ContactTable />
      </VCard>
    </VCol>
</v-row>
</template>

