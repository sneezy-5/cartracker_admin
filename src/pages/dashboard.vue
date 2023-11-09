<script lang="ts" setup>
import AnalitycAward from '@/views/dashboard/AnalitycAward.vue'
import AnalitycChartBar from '@/views/dashboard/AnalitycChartBar.vue'
import DashbordSkelethon from '@/@core/components/features/DashbordSkelethon.vue'
import AnalitycChartPie from '@/views/dashboard/AnalitycChartPie.vue';
import { dashboardService } from '@/_services';

const loading = ref(true);



const form = reactive({
  start_date: new Date().toISOString().substr(0, 10),
  end_date: new Date().toISOString().substr(0, 10),
  formErrors: {
    start_date: false,
    end_date: false,

  },
});


const cars = ref("")
const car_available = ref("")
const car_unvailable = ref("")
const booking = ref("")
const revenu = ref("")
const depense = ref("")
const transaction = ref("")
const CA = ref("")
const weekbooking = ref([])

const getAll =()=>{
  loading.value = true;

  const filter =`?start_date=${form.start_date}&end_date=${form.end_date}`
  dashboardService.getDashboard(filter)
      .then((res: { data:{data:any; }; }) => {
        const data = res.data
        car_available.value = res.data.data.car_available
        car_unvailable.value = res.data.data.car_unavailable
        booking.value = res.data.data.bookings
        revenu.value = res.data.data.revenu
        cars.value =  res.data.data.cars
        CA.value = res.data.data.CA
        depense.value = res.data.data.depense
        transaction.value = res.data.data.transaction
        weekbooking.value = res.data.data.weeklyRevenueForCurrentMonth
        loading.value = false;

        console.log( res.data.data.weeklyRevenueForCurrentMonth[0])

    })
    .catch((error: { status: string; }) => {


     })

}

watch([() => form.start_date, () => form.end_date], (value) => {

  getAll();
});

onMounted(() => {
  getAll();
});
</script>

<template>

<div class="d-flex aligin-end justify-end pr-4 pb-4">
      <VForm class="pr-2">
      <VRow >
    <!-- 👉 start date -->
    <VCol cols="12" md="6" sm="6" xs="6">
      <VTextField
        type="date"
        v-model="form.start_date"
        label="Debut"
        placeholder="Debut"
      />
    </VCol>

    <!-- 👉 end date-->
    <VCol cols="12" md="6" sm="6">
      <VTextField
        type="date"
        v-model="form.end_date"
        label="Fin"
        placeholder="Fin"
      />
    </VCol>
  </VRow>
      </VForm>

    </div>
<DashbordSkelethon v-if="loading"/>

<v-row class="contenair" v-else>

  <v-col cols="12" md="3" class="col-custom" >
    <AnalitycAward title="Vehicules" :value="cars"  icon="mdi-car" color="orange"/>

  </v-col>
  <v-col cols="12" md="3"  class="col-custom">
    <AnalitycAward title="Vehicule en location" :value="car_unvailable" icon="mdi-car-clock" />
  </v-col>
  <v-col cols="12" md="3"  class="col-custom">
    <AnalitycAward title="Vehicule disponible" :value="car_available" icon="mdi-car-back" color="#1B9C85"/>
  </v-col>
  <v-col cols="12" md="3"  class="col-custom">
    <AnalitycAward title="Réservation" :value="booking" color="#FFB562" icon="mdi-plus-network"/>
  </v-col>
  <v-col cols="12" md="3"  class="col-custom">
    <AnalitycAward title="Transactions" :value="transaction" color="#8BACAA" icon="mdi-square-edit-outline"/>
  </v-col>
  <v-col cols="12" md="3"  class="col-custom">
    <AnalitycAward title="Chiffre d'affaire" :value="CA" color="#FF9130" icon="mdi-cash"/>
  </v-col>
  <v-col cols="12" md="3"  class="col-custom">
    <AnalitycAward title="depense" :value="depense" color="#61A3BA" icon="mdi-currency-usd"/>
  </v-col>
  <v-col cols="12" md="3"  class="col-custom">
    <AnalitycAward title="Révenu" :value="revenu" icon="mdi-cash-multiple" color="#C2D9FF"/>
  </v-col>
  <v-col cols="12" md="6"  >
    <AnalitycChartBar :data="weekbooking"/>
  </v-col>
  <v-col cols="12" md="6"  >
    <AnalitycChartPie :ca="CA" :depense="depense"/>
  </v-col>
</v-row>
</template>

<style lang="scss" scoped>
.contenair{
  //  background: blue !important ;
  width: 100%;
  height: 100vh;
}

.custom{
background: red !important;
}

.col-custom{
  display: flex;
   align-items: end;
   justify-content: center;
}
</style>
