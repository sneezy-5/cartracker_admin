/** Import des modules nécessaires */
import Axios from './caller.service'

const headers = { 'Content-Type': 'multipart/form-data' };


let getNewslleters = (filter:string) => {
    return Axios.get('/newsletter/'+filter)
}



export const newsletterService = {
  getNewslleters ,
}
