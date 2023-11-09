<script lang="ts" setup>
import { userService } from '@/_services';
import { useChangeProfileStore } from '@/store/cahngeProfile';
import avatar1 from '@/assets/images/avatar-1.png';

const toast = ref({
  show: false,
  text: '',
  color: '',
});

const profileForm = reactive({
  _method:'PUT',
  name:"",
  email: "",
  profile_image:"",
  avatar1 : avatar1,
  formErrors:{
    name:false,
    email:false,
    phone:false,
  }
});



const refInputEl = ref<HTMLElement>()

const accountDataLocal = ref(profileForm)
const isAccountDeactivated = ref(false)



// changeAvatar function
const changeAvatar = (file: Event) => {
  const fileReader = new FileReader()
  const { files } = file.target as HTMLInputElement

  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.profile_image = files[0]
        accountDataLocal.value.avatar1 = fileReader.result
    }
  }
}


userService.getProfile()
  .then(res => {
    const profileData = res.data;
    if (profileData) {
      profileForm.id = profileData.id
      profileForm.name = profileData.name;
      profileForm.email = profileData.email;
      //profileForm.profile_image = profileData.profile_image;
      profileForm.avatar1 = profileData.profile_image

      console.log(profileData)
    }


  })
  .catch(error => {
    console.error(error);
  });







const submit = () => {
  console.log(profileForm)

  userService.updateUserProfile(profileForm)
      .then((res: any) => {
        profileForm.formErrors.email = false;
          profileForm.formErrors.name = false;
        toast.value = {
        show: true,
        text: 'Modifié  avec succès',
        color: 'success',
      };
      useChangeProfileStore().changeProfile(true)
    })
    .catch((error) => {


if(error.response.data.errors['name']){

profileForm.formErrors.username = true;
toast.value = {
show: true,
text: error.response.data.errors['name'],
color: 'error',
};
}else{

profileForm.formErrors.name = false;

} if(error.response.data.errors['email']){

profileForm.formErrors.email = true;
toast.value = {
show: true,
text: error.response.data.errors['email'],
color: 'error',
};
}else{

profileForm.formErrors.email = false;

}

         console.log(error)
        });

  };

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Details de compte">
        <VCardText class="d-flex" >
          <!-- 👉 Avatar -->
          <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
            :image="profileForm.avatar1"
          />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-5" >
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl?.click()"
              >
                <VIcon
                  icon="mdi-cloud-upload-outline"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Ajouter une nouvelle photo</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              >


            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6"  @submit.prevent="submit" enctype="multipart/form-data">
            <VRow>
              <!-- 👉 Email -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                type="email"
                  v-model="profileForm.email"
                  label="Email"
                />
              </VCol>

              <!-- 👉 Username -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="profileForm.name"
                  label="Username"
                />
              </VCol>


              <!-- 👉 Form Actions -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn type="submit" color="primary">Enregistrer</VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"

                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
 <!--shoxw toats message-->
 <VSnackbar
      v-model="toast.show"
      :timeout="3000"
      :color="toast.color"
      top='top' >
    {{ toast.text }}
    <template #action="{ attrs }">
      <VBtn text v-bind="attrs" @click="toast.show = false">
        <VIcon>mdi-close</VIcon>
      </VBtn>
    </template>
  </VSnackbar>

  </VRow>
</template>
