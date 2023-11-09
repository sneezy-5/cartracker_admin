/** Import des modules nécessaires */
import Axios from './caller.service'

const headers = { 'Content-Type': 'multipart/form-data' };


let getMessages = (filter:string) => {
    return Axios.get('/contact/'+filter)
}



export const contactService = {
  getMessages ,
}
