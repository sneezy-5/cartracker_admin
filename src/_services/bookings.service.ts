/** Import des modules nécessaires */
import Axios from './caller.service'

const headers = { 'Content-Type': 'multipart/form-data' };


let getBookings = (filter:string) => {
    return Axios.get('/booking/'+filter)
}

let getBooking = (uid: number) => {
    return Axios.get('/booking/'+uid)
}


let updateBooking = (form: any) => {
    return Axios.patch('/booking/'+form.id+'/', form)
}


let createBooking = (form: any) => {
    return Axios.post('/booking/', form)
}

let deleteBooking = (uid: number) => {
    return Axios.delete('/booking/'+uid)
}

export const bookingService = {
  getBookings ,
  deleteBooking,
  createBooking,
  updateBooking,
  getBooking,

}
