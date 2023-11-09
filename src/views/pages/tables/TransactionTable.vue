<script setup lang="ts">
import { transactionService } from '@/_services';
import TableSkelethon from '@/@core/components/features/TableSkelethon.vue'
import DeletePopup from '@/components/popup/DeletePopup.vue'
import CreatePopup from '@/components/popup/transactions/form/CreatePopup.vue'
import ToastMesssage from '@/@core/components/features/ToastMesssage.vue'
import EditPopup from '@/components/popup/transactions/form/EditPopup.vue';
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
  transactionService.getTransactions(filter)
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
  transactionService.deleteTransaction(deleteId.value)
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

  <VTable  v-else>
    <thead>
      <tr>
        <th class="text-uppercase">
          Date
        </th>
        <th class="text-uppercase text-center">
          Catégory
        </th>
        <th class="text-uppercase text-center">
          type de transaction
        </th>
        <th class="text-uppercase text-center">
          Description
        </th>

        <th class="text-uppercase text-center">
          Montant
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
          {{ item.trasaction_date }}
        </td>
        <td class="text-center">
          {{ item.trasaction_category }}
        </td>
        <td class="text-center">
          {{ item.trasaction_type }}
        </td>
        <td class="text-center">
          {{ item.trasation_description }}
        </td>
        <td class="text-center">
          {{ item.amount }}
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
