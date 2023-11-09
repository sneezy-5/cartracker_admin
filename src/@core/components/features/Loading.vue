
<script lang="ts" setup>


interface ToastPropType{
  toast:{
    show:boolean,
    text:string,
    color:string,
  }
}
const props = withDefaults(defineProps<ToastPropType>(), {
})



</script>
<template>

    <VSnackbar
      v-model="props.toast.show"
      :timeout="3000"
      :color="props.toast.color"
      top="top" >
    <div class="text-center">
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
  </VSnackbar>
   


 
</template>
