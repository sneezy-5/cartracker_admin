<script lang="ts" setup>
import Sidebar from '@layouts/components/sidebar/Sidebar.vue'
import Header from '@layouts/components/header/Header.vue'
import { useVIsibleStore } from '@/store/activateSide';
import { useMainStore } from '@/store/main';

const toast = ref({
  show: false,
  text: '',
  color: 'success',
});

  const open = ref(false);

  watch(
     () =>   useMainStore().isLogOut,
     (value) =>{
     toast.value.show=value

    }
)
const openSidebar = ()=>{
  open.value =true;
  useVIsibleStore().changeVisible(true);
};

const closeSidebar = ()=>{
  open.value = false;
  useVIsibleStore().changeVisible(false);
};



</script>


<template>


  <v-app  >
    <Loading  :toast="toast"/>
    <Sidebar :open="open"  :toggleIsOverlayNavActive="closeSidebar" />
    <v-main style=" position: absolute; right: 10px; width: 97%;"  >
      <Header :open="open" :setChange="openSidebar" />
      <router-view></router-view>
    </v-main>

  </v-app>




</template>


<style lang="scss" scoped>



</style>
