<script setup lang="ts">
import { newsletterService } from '@/_services';
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
  newsletterService.getNewslleters(filter)
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



// const deleteSubscription = () => {
// console.log(form)
// newsletterService.updateBooking(form)
//       .then((res: { data: { results: any; }; }) => {
//         getAll();
//         toast.value = {
//           show: true,
//           text: 'Enregistré avec susccès',
//           color: 'success',
//           };
//     })
//     .catch((error: { status: string; }) => {

//      })

//      showDialog.value = false;
// };



onMounted(() => {
  getAll();
});

const numPages = computed(() => Math.ceil(desserts[0]?.count / 5));

</script>

<template>
  
   <!-- <div v-if="loading">Chargement en cours...</div> -->

   <TableSkelethon v-if="loading" />

  <VTable  v-else>
    <thead>
      <tr>
        <th class="text-uppercase">
          Email
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
      >
        <td>
          {{ item.email  }}
        </td>

        <td class="text-center">


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
  <!-- show toast -->
  <ToastMesssage :toast="toast"/>
    <!-- popup de suppression -->
    <!-- <DeletePopup :open="showDialog" :Ondelete="deleteSubscription" :OnCancel="closeDialog" title="Voulez-vous confirmer cette action ?"></DeletePopup>
 -->


</template>

<style scoped>

.flex-end{
  display: flex;
  justify-content: end;
  margin-right: 10px;
}

</style>
