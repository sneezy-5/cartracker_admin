/** Import des modules nécessaires */

import Axiosss from './caller-other-service '
import Axios from './caller.service'

let login = (credentials: {email:string, password:string}) => {
    return Axios.post('auth/login', credentials)
}

let logout = () => {
    localStorage.removeItem('access_token')
}



let getDatabase = () => {
  return localStorage.getItem('database')
}

let getToken = () => {
    return localStorage.getItem('access_token')
}




let saveToken = (name:string,token:string) => {
    localStorage.setItem(name, token)
}

let isLogged = () => {
    let token = localStorage.getItem('access_token')
    return !!token
}


export const accountService = {
    login,
    logout,
    saveToken,
    getToken,
    getDatabase,
    isLogged
}
