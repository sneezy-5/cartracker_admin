import { accountService } from "@/_services";
import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    /* User */
    isLogOut: false,
   
  }),
  actions: {


   logout(value:boolean) {

    this.isLogOut = value
  },
    
    

  

  },
});
