<script setup lang="ts">
import { carService } from '@/_services';
import TableSkelethon from '@/@core/components/features/TableSkelethon.vue'
import DeletePopup from '@/components/popup/DeletePopup.vue'
import CreatePopup from '@/components/popup/prostpects/form/CreatePopup.vue'
import ToastMesssage from '@/@core/components/features/ToastMesssage.vue'
import EditPopup from '@/components/popup/prostpects/form/EditPopup.vue';
import { useActivatePopupStore } from '@/store/activatePopup';
import eCommerce2 from '@/assets/images/1.png'

const toast = ref({
  show: false,
  text: '',
  color: '',
});

const desserts:any[] = reactive([]);
const loading = ref(false);

let deleteId = ref(0)
const showDialog = ref(false);

const openCreateDialog = () => {
  useActivatePopupStore().changeOpenCreate(true)};

const openEditDialog = (value:number) => {
  deleteId.value = value;
  useActivatePopupStore().changeOpenEdit(true)
};

//open delete dialog
const openDialog = (id:number) => {
  deleteId.value =id
  showDialog.value = true;
};

//close delete dialog
const closeDialog = () => {
  showDialog.value = false;
};

//get all data form database(api)
let page = ref(1);
const limit = 5;
const getAll =()=>{
  loading.value = true;

  const filter =`?page=${page.value}`
  carService.getCars(filter)
      .then((res: { data:{data:[],count:number; }; }) => {
        const data = res.data

        desserts.pop()
        desserts.push(res.data)
        loading.value = false;

        console.log( desserts[0].data)
    })
    .catch((error: { status: string; }) => {


     })

}



watch(
     () =>  useActivatePopupStore().openCreate,
     (value) =>{

      if(value==false)
        getAll();

    }
)

watch(
     () =>  useActivatePopupStore().openEdit,
     (value) =>{

      if(value==false)
        getAll();

    }
)

const deleteProstpect = () => {
  carService.deleteCar(deleteId.value)
      .then((res: { data: { results: any; }; }) => {
        getAll();
        toast.value = {
          show: true,
          text: 'Supprimsé avec susccès',
          color: 'success',
          };
    })
    .catch((error: { status: string; }) => {

     })

     showDialog.value = false;
};

const selectedItem = ref('');
const openShowDialog = (id:number)=>{
    // Recherchez l'élément correspondant dans desserts[0].data
    selectedItem.value = desserts[0].data.find((item) => item.id === id);
  }

onMounted(() => {
  getAll();
});

const numPages = computed(() => Math.ceil(desserts[0]?.count / 5));

</script>

<template>
   <!-- <div v-if="loading">Chargement en cours...</div> -->
      <VCol class="flex-end">
        <VBtn @click="openCreateDialog" style="background:  rgb(38, 1, 246);; color: #fff;">+Ajouter</VBtn>
      </VCol>
   <TableSkelethon v-if="loading" />

   <VRow cols="12" md="12"  v-else>
   <VCol cols="12" md="6">
    <VTable >
    <thead>
      <tr>
        <th class="text-uppercase">
          Modèl
        </th>
        <th class="text-uppercase text-center">
          marque
        </th>
        <th class="text-uppercase text-center">
          type de carburant
        </th>

        <th class="text-uppercase text-center">
          photo1
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
        style="cursor:pointer"
      >
        <td >
          {{ item.model }}
        </td>
        <td class="text-center">
          {{ item.brand }}
        </td>
        <td class="text-center">
          {{ item.fuel_type }}
        </td>



        <td class="text-center">
          <!-- {{ item.picture1 }} -->
          <v-img :src="item.picture1"></v-img>
        </td>

        <td class="text-center">
          <button @click="openEditDialog(item.id)">
            <VIcon icon="mdi-pencil-outline"></VIcon>

        </button>

          <button @click="openDialog(item.id)">
          <VIcon icon="mdi-trash-can-outline" style="color: red;"></VIcon>
      </button>
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




          <div>
            <div class="d-flex justify-center aligin-center">
            <VImg
              width="300"
              height="176"
              :src="selectedItem.picture1"
            />
          </div>
            <VCardItem class="d-flex justify-center aligin-center">
              <VCardTitle> Model: {{ selectedItem.model }}</VCardTitle>
            </VCardItem>
            <VRow>

              <VCol cols="12" md="6">
                <VCardText>
              <strong>Marque:</strong>  {{ selectedItem.brand }}
            </VCardText>
              </VCol>
              <VCol cols="12" md="6">
                <VCardText>
              <strong>Année:</strong>  {{ selectedItem.year_of_manufacture }}
            </VCardText>
              </VCol>

              <VCol cols="12" md="6">
                <VCardText>
              <strong>Boite de vitesse:</strong>  {{ selectedItem.gearbox }}
            </VCardText>
              </VCol>

              <VCol cols="12" md="6">
                <VCardText v-if="selectedItem.gps==1">
              <strong>GPS: </strong>  Oui
            </VCardText>
            <VCardText v-if="selectedItem.gps==0">
              <strong>GPS: </strong>  Non
            </VCardText>
              </VCol>

              <VCol cols="12" md="6">
                <VCardText>
              <strong>Status:</strong> {{ selectedItem.status }}
            </VCardText>
              </VCol>

              <VCol cols="12" md="6">
                <VCardText>
              <strong>Nombre de place:</strong>  {{ selectedItem.number_place }}
            </VCardText>
              </VCol>



              <VCol cols="12" md="6">
                <VCardText>
              <strong>Type carurant:</strong>  {{ selectedItem.fuel_type }}
            </VCardText>
              </VCol>

              <VCol cols="12" md="6">
                <VCardText>
              <strong>Plaque:</strong>  {{ selectedItem.numberplate }}
            </VCardText>
              </VCol>


              <VCol cols="12" md="6">
                <VCardText>
              <strong>Kilomètrage:</strong> {{ selectedItem.mileage }}
            </VCardText>
              </VCol>

              <VCol cols="12" md="6">
                <VCardText>
              <strong>Description:</strong>  {{ selectedItem.description }}
            </VCardText>
              </VCol>


              <VCol cols="12" md="6">
                <VCardText class="text-subtitle-1">
              <strong>Prix de location:</strong>  <span class="font-weight-medium">{{ selectedItem.rental_price_per_day }}</span>
            </VCardText>
              </VCol>


            </VRow>


          </div>
        </div>
      </VCard>
    </VCol>
  </VRow>


  <!-- show toast -->
  <ToastMesssage :toast="toast"/>
    <!-- popup de suppression -->
    <DeletePopup :open="showDialog" :Ondelete="deleteProstpect" :OnCancel="closeDialog"></DeletePopup>

    <!-- popu de  creation des prostpects-->
    <CreatePopup  />

    <EditPopup :id="deleteId"/>
</template>

<style scoped>

.flex-end{
  display: flex;
  justify-content: end;
  margin-right: 10px;
}

</style>
