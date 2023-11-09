<script lang="ts" setup>
import { usePaddingStore } from '@/store/changPadding';
import SidebarList from './SidebarList.vue';
import { useVIsibleStore } from '@/store/activateSide';
import { useDisplay } from 'vuetify'

interface sidebarPropType{
  open?: boolean
  toggleIsOverlayNavActive: () => void
}
const props = withDefaults(defineProps<sidebarPropType>(), {
})



const route = useRoute()


watch(
  () => route.path,
  () => {
    useVIsibleStore().changeVisible(false)
  })

const asidval = ref('270');
const isOpen = ref(false);
isOpen.value= props.open;
const isVisible = ref(false);
const rail = ref(false);
watch(
  () =>  rail.value,
  (value) => {
    usePaddingStore().changePadding(value)
    isVisible.value = value
    // console.log(value)
  })

const {lgAndUp } = useDisplay()

watch(
     () => props.open,
     (value) =>{
      isOpen.value = value
      console.log(value)
    }
)
</script>

<template>
  <div  v-if="lgAndUp" >
    <v-navigation-drawer app permanent v-model="lgAndUp" class="custom"   :width='asidval' :rail="rail" :rail-width="90"   @click="rail = false" >
      <v-col  style="display: flex; justify-content: space-between; background: rgb(0, 0, 1); color: #fff; border-radius: 30px;">
          <p style="display: flex; align-items: center; justify-content: center;">
            <v-icon icon="mdi-car" color="primary"></v-icon>
            <span>CAR RENT</span>
        </p>
        <v-btn
              variant="text"
              icon="mdi-menu"
              @click.stop="rail = !rail"
            ></v-btn>




      </v-col>

      <SidebarList/>
  </v-navigation-drawer>
  </div>
  <div   v-if="!lgAndUp" class="overlay-card">
    <v-navigation-drawer  class="custom" app temporary :width='asidval'  v-model="props.open"  @click.stop="props.toggleIsOverlayNavActive" :rail="rail"   @click="rail = false" >
      <v-col  style="display: flex; justify-content: space-between; background: rgb(19, 20, 21); color: #fff; border-radius: 30px;">
          <p style="display: flex; align-items: center; justify-content: center;">
            <span>Car rent</span>
        </p>
        <v-btn
              variant="text"
              icon="mdi-menu"
              @click.stop="rail = !rail"
            ></v-btn>


        <!-- <IconBtn
          class="ms-n3"
          style="cursor: pointer;"
          @click="toggleNavCollapse"
        >
          <VIcon icon="mdi-menu" />
        </IconBtn> -->

      </v-col>
      <SidebarList/>
  </v-navigation-drawer>
  </div>

</template>


<style lang="scss" scoped>
.overlay-card {
  z-index: 1000;
}
.custom{
  background:linear-gradient(to bottom,  #090909, #252229) !important;
  // position: fixed !important;
  // left: 10px !important;
  // top: 10px !important;
  // height: 90vh !important;
  // border-radius: 30px;

}





li ,.router-link{
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  padding: 10px;
  color: #fff;
  cursor: pointer;
  &:hover{
    color: #ecef89e2;

  }
}
/* Pour les navigateurs basés sur WebKit (Chrome, Safari) */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: linear-gradient(to bottom,  #4421d2, #6801e7) !important;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}


</style>




