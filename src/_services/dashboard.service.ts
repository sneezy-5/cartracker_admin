/** Import des modules nécessaires */
import Axios from './caller.service'


let getDashboard = (filter:string) => {
    return Axios.get('/dashboard/'+filter)
}



export const dashboardService = {
  getDashboard
}
