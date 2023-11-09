<script setup lang="ts">
import { carService } from '@/_services';
import Popup from '@/@core/components/features/Popup.vue';
import ToastMesssage from '@/@core/components/features/ToastMesssage.vue'
import { useActivatePopupStore } from '@/store/activatePopup';
import avatar1 from '@/assets/images/1.png';

const toast = ref({
  show: false,
  text: '',
  color: '',
});




const status = ['Disponible','en location','En vente']

const showCreateDialog = ref(false);


const form = reactive({
  brand:"",
  model: "",
  mileage:"",
  numberplate:0,
  gearbox:'',
  gps:0,
  fuel_type:null,
  rental_price_per_day:"",
  year_of_manufacture:"",
  status:'Disponible',
  number_place:0,
  description:"",
  picture1:"",
  picture2:"",
  picture3:"",
  picture4:"",
  avatar1 : avatar1,
  avatar2 : avatar1,
  avatar3 : avatar1,
  avatar4 : avatar1,
  formErrors:{
    brand: false,
  model: false,
  mileage:false,
  numberplate:false,
  fuel_type:false,
  rental_price_per_day:false,
  year_of_manufacture:false,
  number_place:false,
  description:false,
  status:false,
  picture1:false,
  picture2:false,
  picture3:false,
  picture4:false,
  }
})



const refInputEl1 = ref<HTMLElement>()

const refInputEl2 = ref<HTMLElement>()
const refInputEl3 = ref<HTMLElement>()
const refInputEl4 = ref<HTMLElement>()
const accountDataLocal = ref(form)


// changeAvatar function
const changePic1 = (file: Event) => {
  const fileReader = new FileReader()
  const { files } = file.target as HTMLInputElement

  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.picture1 = files[0]
        accountDataLocal.value.avatar1 = fileReader.result
    }
  }
}

// changeAvatar function
const changePict2 = (file: Event) => {
  const fileReader = new FileReader()
  const { files } = file.target as HTMLInputElement

  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.picture2 = files[0]
        accountDataLocal.value.avatar2 = fileReader.result
    }
  }
}

// changeAvatar function
const changePic3 = (file: Event) => {
  const fileReader = new FileReader()
  const { files } = file.target as HTMLInputElement

  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.picture3 = files[0]
        accountDataLocal.value.avatar3 = fileReader.result
    }
  }
}

// changeAvatar function
const changePic4 = (file: Event) => {
  const fileReader = new FileReader()
  const { files } = file.target as HTMLInputElement

  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.picture4 = files[0]
        accountDataLocal.value.avatar4 = fileReader.result
    }
  }
}
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
 const createCar = ()=>{
  console.log(form)
  carService.createCar(form)
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
    if(error.response.data.errors['model']){

        form.formErrors.model = true;
        toast.value = {
        show: true,
        text: error.response.data.errors['model'],
        color: 'error',
        };
        }else{

        form.formErrors.model = false;

        }
        if(error.response.data.errors['brand']){

          form.formErrors.brand = true;
          toast.value = {
          show: true,
          text: error.response.data.errors['brand'],
          color: 'error',
          };
          }else{

          form.formErrors.brand = false;

          }
          if(error.response.data.errors['mileage']){

          form.formErrors.mileage = true;
          toast.value = {
          show: true,
          text: error.response.data.errors['mileage'],
          color: 'error',
          };
          }else{

          form.formErrors.mileage = false;

          }
          if(error.response.data.errors['numberplate']){

          form.formErrors.numberplate = true;
          toast.value = {
          show: true,
          text: error.response.data.errors['numberplate'],
          color: 'error',
          };
          }else{

          form.formErrors.numberplate = false;

          }
          if(error.response.data.errors['fuel_type']){

          form.formErrors.fuel_type = true;
          toast.value = {
          show: true,
          text: error.response.data.errors['fuel_type'],
          color: 'error',
          };
          }else{

          form.formErrors.fuel_type = false;

          }
          if(error.response.data.errors['rental_price_per_day']){

        form.formErrors.rental_price_per_day = true;
        toast.value = {
        show: true,
        text: error.response.data.errors['rental_price_per_day'],
        color: 'error',
        };
        }else{

        form.formErrors.rental_price_per_day = false;

        }
        if(error.response.data.errors['year_of_manufacture']){

        form.formErrors.year_of_manufacture = true;
        toast.value = {
        show: true,
        text: error.response.data.errors['year_of_manufacture'],
        color: 'error',
        };
        }else{

        form.formErrors.year_of_manufacture = false;

        }
        if(error.response.data.errors['picture1']){

          form.formErrors.picture1 = true;
          toast.value = {
          show: true,
          text: error.response.data.errors['picture1'],
          color: 'error',
          };
          }else{

          form.formErrors.picture1 = false;

          }
          if(error.response.data.errors['picture2']){

            form.formErrors.picture1 = true;
            toast.value = {
            show: true,
            text: error.response.data.errors['picture2'],
            color: 'error',
            };
            }else{

            form.formErrors.picture2 = false;

            }
            if(error.response.data.errors['picture3']){

            form.formErrors.picture1 = true;
            toast.value = {
            show: true,
            text: error.response.data.errors['picture3'],
            color: 'error',
            };
            }else{

            form.formErrors.picture3 = false;

            }
            if(error.response.data.errors['picture4']){

              form.formErrors.picture4 = true;
              toast.value = {
              show: true,
              text: error.response.data.errors['picture4'],
              color: 'error',
              };
              }else{

              form.formErrors.picture4 = false;

              }
              if(error.response.data.errors['description']){

form.formErrors.description = true;
toast.value = {
show: true,
text: error.response.data.errors['description'],
color: 'error',
};
}else{

form.formErrors.description = false;

}
if(error.response.data.errors['number_place']){

form.formErrors.number_place = true;
toast.value = {
show: true,
text: error.response.data.errors['number_place'],
color: 'error',
};
}else{

form.formErrors.number_place = false;

}
          console.log(error)
         })


}




</script>

<template>

  <!-- show toast -->
  <ToastMesssage :toast="toast"/>

    <!-- popu de  creation des prostpects-->
    <Popup :open="showCreateDialog" title="Ajouter" width="630">
      <template #container>
        <VForm @submit.prevent="createCar" >
            <VCard>
             <VRow>

              <VCol cols="12" md="6">
                <VTextField label="Moèdel"
                v-model="form.model"
                :error="form.formErrors.model"

                />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField label="Marque" type="text"
              v-model="form.brand"
                :error="form.formErrors.brand"
                />
            </VCol>
             </VRow>
            <VCol cols="12" md="12">
              <VTextField label="Type de carburant" type="text"
              v-model="form.fuel_type"
                :error="form.formErrors.fuel_type"
                />
            </VCol>
            <VCol cols="12" md="12">
              <VTextField label="Kilomètrage" type="number"
              v-model="form.mileage"
                :error="form.formErrors.mileage"
                />
            </VCol>
            <VCol cols="12" md="12">
                      <v-select
              v-model="form.gearbox"
              :items="['Automatique', 'Manuelle']"
              label="Boite de vitesse"
            ></v-select>
            <v-radio
              v-model="form.gearbox"
              false-value="Automatique"
              label="Automatique"
              readonly
              true-value="Automatique"
              color="primary"
            ></v-radio>
            <v-radio
              v-model="form.gearbox"
              false-value="Manuelle"
              label="Manuelle"
              readonly
              true-value="Manuelle"
              color="info"
            ></v-radio>
            </VCol>

            <VCol cols="12" md="12">
              <v-radio-group inline v-model="form.gps">
                <v-radio label="Avec GPS" :value="1" color="success"></v-radio>
                <v-radio label="Sans GPS" :value="0" color="error" ></v-radio>
              </v-radio-group>
            </VCol>

            <VCol cols="12" md="12">
              <VTextField label="Nombre de place" type="number"
              v-model="form.number_place"
                :error="form.formErrors.number_place"
                />
            </VCol>
            <VCol cols="12" md="12">
              <VTextField label="Plaque d'immatriculation" type="text"
              v-model="form.numberplate"
                :error="form.formErrors.numberplate"
                />
            </VCol>
            <VCol cols="12" md="12">
              <VTextField label="Année de fabrication" type="number"
              v-model="form.year_of_manufacture"
                :error="form.formErrors.year_of_manufacture"
                />
            </VCol>
            <VCol cols="12" md="12">
              <VTextField label="Prix de location par jour" type="number"
              v-model="form.rental_price_per_day"
                :error="form.formErrors.rental_price_per_day"
                />
            </VCol>
            <VCol cols="12" md="12">
              <VTextarea label="Description" type="text"
              v-model="form.description"
                :error="form.formErrors.description"
                />
            </VCol>
            <VCol cols="12" md="12">
            <VSelect  label="Status" :items="status"
              v-model="form.status"
                :error="form.formErrors.status"
                />
            </VCol>
                 <!-- 👉 upload-->
            <VRow>
              <VCol
        cols="12"
        md=""
      >

      <VCardText class="d-flex"   :error="form.formErrors.picture1">

          <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
            :image="form.avatar1"
            :error="form.formErrors.picture1"
          />


          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl1?.click()"
              >
                <VIcon
                  icon="mdi-cloud-upload-outline"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Photo</span>
              </VBtn>

              <input
                ref="refInputEl1"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changePic1"
              >


            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
        </VCardText>
      </VCol>

      <VCol
        cols="12"
        md=""
      >

      <VCardText class="d-flex"   :error="form.formErrors.picture2">

          <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
            :image="form.avatar2"
          />


          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl2?.click()"
              >
                <VIcon
                  icon="mdi-cloud-upload-outline"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Photo</span>
              </VBtn>

              <input
                ref="refInputEl2"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changePict2"
              >


            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
        </VCardText>
      </VCol>

      <VCol
        cols="12"
        md=""
      >

      <VCardText class="d-flex"   :error="form.formErrors.picture3">

          <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
            :image="form.avatar3"
          />


          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl3?.click()"
              >
                <VIcon
                  icon="mdi-cloud-upload-outline"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Photo</span>
              </VBtn>

              <input
                ref="refInputEl3"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changePic3"
              >

            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
        </VCardText>
      </VCol>

      <VCol
        cols="12"
        md=""
      >

      <VCardText class="d-flex"   :error="form.formErrors.picture4">

          <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
            :image="form.avatar4"
          />


          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl4?.click()"
              >
                <VIcon
                  icon="mdi-cloud-upload-outline"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Photo</span>
              </VBtn>

              <input
                ref="refInputEl4"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changePic4"
              >
            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
        </VCardText>
      </VCol>
    </VRow>

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
