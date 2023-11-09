/** Import des modules nécessaires */
import Axios from './caller.service'

const headers = { 'Content-Type': 'multipart/form-data' };


let getCars = (filter:string) => {
    return Axios.get('/cars/'+filter)
}

let getCar = (uid: number) => {
    return Axios.get('/cars/'+uid)
}



let updateCar = (prostpect: any) => {
    return Axios.post('/cars/'+prostpect.id+'/', prostpect,{ headers })
}


let createCar = (user: any) => {
    return Axios.post('/cars', user,{ headers })
}

let deleteCar = (uid: number) => {
    return Axios.delete('/cars/'+uid)
}

export const carService = {
  getCars,
  getCar,
  updateCar,
  createCar,
  deleteCar,

}
