import { accountService } from '@/_services';
import router from '@/router'
import { useMainStore } from '@/store/main';

const logoutF = ()=>{

    accountService.logout()
  router.push('/auth/login')
}
export function logout (){
  useMainStore().logout(true)
  setTimeout(
    ()=>logoutF(),
    3000
  )

}
