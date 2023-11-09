<script setup lang="ts">

interface propPropType{
  open: boolean
  title?:string;
  Ondelete: () => void
  OnCancel: () => void
}
const props = withDefaults(defineProps<propPropType>(), {
})


</script>

<template>


    <!-- popup de suppression  -->
    <v-dialog v-model="props.open" max-width="500px">
    <v-card>
      <v-card-title class="headline">Confirmation de suppression</v-card-title>

      <v-card-text v-if="props.title">
       {{props.title}}
      </v-card-text>
      <v-card-text v-else>
        Êtes-vous sûr de vouloir supprimer ces données ?
      </v-card-text>

      <v-card-actions>
        <v-btn  @click="props.Ondelete"  color="primary" >Confimer</v-btn>
        <v-btn  @click="props.OnCancel" color="error">Annuler</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>



</style>
