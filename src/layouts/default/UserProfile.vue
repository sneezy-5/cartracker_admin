<script setup lang="ts">

import { logout } from '@/_helpers/logout';
import { accountService, userService } from '@/_services';
import { useChangeProfileStore } from '@/store/cahngeProfile';


      const form=reactive({
        userName:'',
        userEmail:'',
        userAvatar:'',
        lastLogin:'',
        is_superadmin:"SuperAdmin"
      })


const getProfile = ()=>{
  userService.getProfile()
        .then((res: { data: any; }) => {
          const profileData = res.data;
          if (profileData) {

            form.userName = profileData.name;
            form.userEmail = profileData.email;
            form.userAvatar = profileData.profile_image;
          }
          console.log( res.data)

        })
        .catch((error: any) => {
          console.error(error);
        });

}

onMounted(() => {
  getProfile();
});

watch(
     () =>  useChangeProfileStore().change,
     (value) =>{
      getProfile();
      useChangeProfileStore().changeProfile(false)


    }
)



</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
    bordered
    link
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"

    >
      <VImg  :src="form.userAvatar" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList  >
          <!-- 👉 User Avatar & Name -->
          <VListItem >
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"

                  >
                    <VImg  />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>
            <VListItemTitle class="font-weight-semibold"  >
              {{form.userName}}
            </VListItemTitle>
            <VListItemSubtitle  >{{form.is_superadmin}}</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link  >
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-account-outline"
                size="22"

              />
            </template>

            <VListItemTitle >Profil</VListItemTitle>
          </VListItem>

         <!-- 👉 Settings -->
<VListItem link>
  <template #prepend>
    <VIcon
      class="me-2"
      icon="mdi-cog-outline"
      size="22"
    />
  </template>
  <VListItemTitle  >Paramètre</VListItemTitle>
</VListItem>




          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem  link   @click="logout" style="color: red;">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-logout"
                size="22"

              />
            </template>

            <VListItemTitle >Deconexion</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
