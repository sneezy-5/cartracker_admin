<script setup lang="ts">
import { transactionService } from '@/_services';
import Popup from '@/@core/components/features/Popup.vue';
import ToastMesssage from '@/@core/components/features/ToastMesssage.vue'
import { useActivatePopupStore } from '@/store/activatePopup';

const toast = ref({
  show: false,
  text: '',
  color: '',
});




const status = ['Disponible','en location','En vente']

const showCreateDialog = ref(false);


const form = reactive({
  trasaction_date:"",
  trasaction_type: "",
  trasation_description:"",
  trasaction_category:"Révenu",
  amount:null,

  formErrors:{
    trasaction_date:false,
  trasaction_type: false,
  trasation_description: false,
  trasaction_category: false,
  amount:false,
  }
})




watch(
     () =>  useActivatePopupStore().openCreate,
     (value) =>{
      showCreateDialog.value = value;
    }
)

const closeCreateDialog = () => {
  useActivatePopupStore().changeOpenCreate(false)
};




/**
 * edit one prospect elmement
 * @param form
 */
 const createTransaction = ()=>{
  console.log(form)
  transactionService.createTransaction(form)
    .then((res: { data: { results: any; }; }) => {
      // showCreateDialog.value = false;
      useActivatePopupStore().changeOpenCreate(false)
      toast.value = {
        show: true,
        text: 'Enregistré avec susccès',
        color: 'success',
        };
      console.log(res)
  })
  .catch((error: { status: number; response:any}) => {
    if(error.response.data.errors['trasaction_date']){

        form.formErrors.trasaction_date = true;
        toast.value = {
        show: true,
        text: error.response.data.errors['trasaction_date'],
        color: 'error',
        };
        }else{

        form.formErrors.trasaction_date = false;

        }
        if(error.response.data.errors['trasaction_type']){

          form.formErrors.trasaction_type = true;
          toast.value = {
          show: true,
          text: error.response.data.errors['trasaction_type'],
          color: 'error',
          };
          }else{

          form.formErrors.trasaction_type = false;

          }
          if(error.response.data.errors['trasation_description']){

          form.formErrors.trasation_description = true;
          toast.value = {
          show: true,
          text: error.response.data.errors['trasation_description'],
          color: 'error',
          };
          }else{

          form.formErrors.trasation_description = false;

          }
          if(error.response.data.errors['trasaction_category']){

          form.formErrors.trasaction_category = true;
          toast.value = {
          show: true,
          text: error.response.data.errors['trasaction_category'],
          color: 'error',
          };
          }else{

          form.formErrors.trasaction_category = false;

          }

          console.log(error)
         })


}




</script>

<template>

  <!-- show toast -->
  <ToastMesssage :toast="toast"/>

    <!-- popu de  creation des prostpects-->
    <Popup :open="showCreateDialog" title="Ajouter" width="530">
      <template #container>
        <VForm @submit.prevent="createTransaction" >
            <VCard>
              <VCol cols="12" md="12">
                <VTextField label="Date de la tranaction"
                type="date"
                v-model="form.trasaction_date"
                :error="form.formErrors.trasaction_date"

                />

            </VCol>

            <VCol cols="12" md="12">
            <VSelect  label="Type de tranaction" :items="['Vente','Location','Achat','Payement',]"
              v-model="form.trasaction_type"
                :error="form.formErrors.trasaction_type"
                />
              </VCol>

              <VCol cols="12" md="12">
            <VSelect  label="Catégory" :items="['Révenu','Dépense']"
              v-model="form.trasaction_category"
                :error="form.formErrors.trasaction_category"
                />
              </VCol>


            <VCol cols="12" md="12">
              <VTextField label="Description" type="text"
              v-model="form.trasation_description"
                :error="form.formErrors.trasation_description"
                />
            </VCol>

            <VCol cols="12" md="12">
              <VTextField label="Montant" type="number"
              v-model="form.amount"
                :error="form.formErrors.amount"
                />
            </VCol>

          </VCard>
          <VCol style="display: flex; align-items: center; justify-self: center; gap:6px">
            <VBtn type="submit" color="primary">Enregistrer</VBtn>
            <VBtn @click="closeCreateDialog" color="error">Annuler</VBtn>
           </VCol>
        </VForm>

      </template>
    </Popup>

</template>

<style scoped>



</style>
