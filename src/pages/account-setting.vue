<script lang="ts" setup>
import { useRoute } from 'vue-router'
import AccountSettingsNotification from '@/views/pages/account-settings/AccountSettingsNotification.vue'
import AccountSettingsAccountT from '@/views/pages/account-settings/AccountSettingsAccountT.vue';
import AccountSettingsSecuritT from '@/views/pages/account-settings/AccountSettingsSecuritT.vue';
import AccountSettingsAccountTParam from '@/views/pages/account-settings/AccountSettingsAccountTParam.vue';
const route = useRoute()

const activeTab = ref(route.params.tab)

// tabs
const tabs = [
  { title: 'Compte', icon: 'mdi-account-outline', tab: 'account' },
  { title: 'Securité', icon: 'mdi-lock-open-outline', tab: 'security' },
  // { title: 'Notifications', icon: 'mdi-bell-outline', tab: 'notification' },
]
</script>

<template>
  <div>
    <VTabs
      v-model="activeTab"
      show-arrows
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>
    <VDivider />

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
    >
      <!-- Account -->
      <VWindowItem value="account">
        <AccountSettingsAccountT />
      </VWindowItem>

      <!-- Security -->
      <VWindowItem value="security">
        <AccountSettingsSecuritT />
      </VWindowItem>

      <!-- Notification -->
      <VWindowItem value="notification">
        <AccountSettingsNotification />
      </VWindowItem>
    </VWindow>
  </div>
</template>
