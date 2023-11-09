/** Import des modules nécessaires */
import Axios from './caller.service'

const headers = { 'Content-Type': 'multipart/form-data' };


let getTransactions = (filter:string) => {
    return Axios.get('/transaction/'+filter)
}

let getTransaction= (uid: number) => {
    return Axios.get('/transaction/'+uid)
}



let updateTransaction = (prostpect: any) => {
    return Axios.put('/transaction/'+prostpect.id+'/', prostpect)
}


let createTransaction= (user: any) => {
    return Axios.post('/transaction', user,{ headers })
}

let deleteTransaction = (uid: number) => {
    return Axios.delete('/transaction/'+uid)
}

export const transactionService = {
  getTransactions,
  getTransaction,
  updateTransaction,
  createTransaction,
  deleteTransaction,

}
