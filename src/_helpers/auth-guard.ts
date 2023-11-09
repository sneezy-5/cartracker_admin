import router from '@/router'

export function authGuard(){
    let token = localStorage.getItem('access_token')

    if(token){
        return true
    }

    router.push('/auth/login')
}
