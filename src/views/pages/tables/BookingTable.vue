<script setup lang="ts">
import { bookingService } from '@/_services';
import TableSkelethon from '@/@core/components/features/TableSkelethon.vue'
import DeletePopup from '@/components/popup/DeletePopup.vue'
import CreatePopup from '@/components/popup/subscription/form/CreatePopup.vue'
import ToastMesssage from '@/@core/components/features/ToastMesssage.vue'
import { useActivatePopupStore } from '@/store/activatePopup';
const toast = ref({
  show: false,
  text: '',
  color: '',
});

const desserts:any[] = reactive([]);
const loading = ref(false);

let deleteId = ref(0)
const showDialog = ref(false);
const showDialogCancel = ref(false);

const form = reactive({
    id:deleteId.value,
    status:'confirmé'
  })

const openCreateDialog = () => {
  useActivatePopupStore().changeOpenCreate(true)};



//open delete dialog
const openDialogConfirm = (id:number) => {
  deleteId.value =id
  showDialog.value = true;
  form.id =deleteId.value
  form.status ='confirmé'
};

const openDialogCancel = (id:number) => {
  deleteId.value =id
  showDialog.value = true;
  form.id =deleteId.value
  form.status ='Annulé'
};
//close delete dialog
const closeDialog = () => {
  showDialog.value = false;
};

//get all data form database(api)
let page = ref(1);
const getAll =()=>{
  loading.value = true;
  const filter =`?page=${page.value}`
  bookingService.getBookings(filter)
      .then((res: { data: { results: any; }; }) => {
        const data = res.data.results

        desserts.pop()
        desserts.push(res.data)
        loading.value = false;

        console.log(filter, data, page.value)
    })
    .catch((error: { status: string; }) => {
            if(error.status =="401"){

                    console.error(error)

            }
            loading.value = false;
     })

}



watch(
     () =>  useActivatePopupStore().openCreate,
     (value) =>{

      if(value==false)
        getAll();

    }
)



const deleteSubscription = () => {
console.log(form)
  bookingService.updateBooking(form)
      .then((res: { data: { results: any; }; }) => {
        getAll();
        toast.value = {
          show: true,
          text: 'Enregistré avec susccès',
          color: 'success',
          };
    })
    .catch((error: { status: string; }) => {

     })

     showDialog.value = false;
};


const selectedItem = ref('');
const openShowDialog = (id:number)=>{
    selectedItem.value = desserts[0].data.find((item) => item.id === id);
  }

onMounted(() => {
  getAll();
});

const numPages = computed(() => Math.ceil(desserts[0]?.count / 5));

</script>

<template>
   <!-- <div v-if="loading">Chargement en cours...</div> -->

   <TableSkelethon v-if="loading" />

   <VRow cols="12" md="12"  v-else>
    <VCol
    sm="6"
      cols="12">
      <VTable >
    <thead>
      <tr>
        <th class="text-uppercase">
          date et heure de location
        </th>

        <th class="text-uppercase text-center">
          Status
        </th>
        <th class="text-uppercase text-center">
          Voiture reservé
        </th>
        <th class="text-uppercase text-center">
         Action
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
      v-for="item in desserts[0]?.data"
        :key="item.id"
        @click="openShowDialog(item.id)"
      >
        <td>
          {{ item.start_date  }}
        </td>

        <td class="text-center">
          <v-chip
      class="ma-2"

      :color="item.status === 'Annulé' ? 'red' : (item.status === 'En attente de traitement' ? 'orange' : (item.status === 'confirmé' ? 'green' : 'teal'))"
      text-color="white"
      :prepend-icon="item.status === 'Annulé' ? 'mdi-close' : (item.status === 'En attente de traitement' ? 'mdi-clock' : (item.status === 'confirmé' ? 'mdi-checkbox-marked-circle' : ''))"
      :model-value="true"
    >
    {{ item.status }}
    </v-chip>

        </td>
        <td class="text-center">
          {{ item.car?.model }} - {{ item.car?.brand }}
          <v-img :src="item.car?.picture1"></v-img>
        </td>
        <td class="text-center">

          <v-chip
    v-if="item.status !== 'confirmé' && item.status !== 'Annulé'"
    @click="openDialogConfirm(item.id)"
      class="ma-2"
      color="teal"
      text-color="white"
      prepend-icon="mdi-checkbox-marked-circle"
      :model-value="true"
      elevation="3"
      style="border-radius: 0px;"
    >
    Confirmer
    </v-chip>
    <v-chip
    v-if="item.status !== 'confirmé' && item.status !== 'Annulé'"
      class="ma-2"
      color="error"
      text-color="white"
      prepend-icon="mdi-cancel"
      :model-value="true"
      @click="openDialogCancel(item.id)"
      style="border-radius: 0px;"
      elevation="3"

    >
    Annuler
    </v-chip>

        </td>
      </tr>

    </tbody>
  </VTable>
    <div class="text-xs-center">

      <v-pagination v-model="page"
      :length="numPages"
      :total-visible="5"
      rounded="circle"
      @click="getAll"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right" />
  </div>
    </VCol>
  <VCol
      md="6"
      cols="12"
    >
      <VCard>
        <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">


          <!-- <VDivider :vertical="$vuetify.display.mdAndUp" /> -->

          <div>
            <div class="ma-auto pa-5">
            <VImg

              height="176"
              :src="selectedItem.car?.picture1"
            />
          </div>
            <VCardItem>
              <VCardTitle>Réservé pour: <span>{{ selectedItem.start_date }} à {{ selectedItem.time }}</span></VCardTitle>
            </VCardItem>

            <VCardText>
              Vehicule: <span span class="font-weight-medium">{{ selectedItem.car?.brand }} - {{ selectedItem.car?.model }}</span>
            </VCardText>

            <VCardText>
              Nom: <span span class="font-weight-medium">{{ selectedItem.fname }}</span>
            </VCardText>

            <VCardText>
              Prénom: <span span class="font-weight-medium">{{ selectedItem.lname }}</span>
            </VCardText>

            <VCardText>
             Phone: <span span class="font-weight-medium">{{ selectedItem.phone }}</span>
            </VCardText>


            <VCardText>
              Status: <span span class="font-weight-medium">{{ selectedItem.status }}</span>
            </VCardText>

            <VCardText>
              Démande spécial: <span span class="font-weight-medium"> {{ selectedItem.special_request }}</span>
            </VCardText>


            <VCardText class="text-subtitle-1">
              <span>Prix de location :</span> <span class="font-weight-medium">{{ selectedItem.amount }} FCFA</span>
            </VCardText>


          </div>
        </div>
      </VCard>
    </VCol>
   </VRow>

  <!-- show toast -->
  <ToastMesssage :toast="toast"/>
    <!-- popup de suppression -->
    <DeletePopup :open="showDialog" :Ondelete="deleteSubscription" :OnCancel="closeDialog" title="Voulez-vous confirmer cette action ?"></DeletePopup>



</template>

<style scoped>

.flex-end{
  display: flex;
  justify-content: end;
  margin-right: 10px;
}

</style>
