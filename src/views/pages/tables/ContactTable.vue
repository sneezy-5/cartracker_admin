<script setup lang="ts">
import { contactService } from '@/_services';
import TableSkelethon from '@/@core/components/features/TableSkelethon.vue'
import { useActivatePopupStore } from '@/store/activatePopup';


const desserts:any[] = reactive([]);
const loading = ref(false);






//get all data form database(api)
let page = ref(1);
const getAll =()=>{
  loading.value = true;
  const filter =`?page=${page.value}`
  contactService.getMessages(filter)
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
          nom
        </th>
        <th class="text-uppercase text-center">
          Email
        </th>
        <th class="text-uppercase text-center">
          Sujet
        </th>
        <th class="text-uppercase text-center">
          Message
        </th>
        <!-- <th class="text-uppercase text-center">
         Action
        </th> -->
      </tr>
    </thead>

    <tbody>
      <tr
      v-for="item in desserts[0]?.data"
        :key="item.id"
      >
        <td>
          {{ item.name  }}
        </td>
        <td class="text-center">
          {{ item.email }}
        </td>
        <td class="text-center">
          {{ item.subject }}
        </td>
        <td class="text-center">
          {{ item.message }}
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


</template>

<style scoped>

.flex-end{
  display: flex;
  justify-content: end;
  margin-right: 10px;
}

</style>
