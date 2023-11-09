// paddingStore.ts
import { defineStore } from 'pinia';

export const useChangeProfileStore = defineStore('changeProfile', {
  state: () => ({
    change: false,
    
  }),

  actions: {
    changeProfile(value:boolean) {

      this.change = value
    },
  
  },
});
