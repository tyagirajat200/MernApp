import axios from 'axios';
import { CREATE,FETCH_ALL,UPDATE,DELETE } from './types'

// it is function that returns function

export const fetchAll = (userId) => (dispatch) => {
    console.log("FETCHING ALL DATA")
    axios.get('/postmessages/'+userId)
        .then(res => {
            console.log("fetcjing data inside axios")
            dispatch({
                type: FETCH_ALL,
                payload: res.data
            })
            
        })
        .catch(err => console.log(err))

}


export const create = (userId,data ) => dispatch => { 
    console.log("INSERTING THE DATA",userId,data)
    axios.post('/postmessages/'+userId , data)
        .then(res => {
            console.log("INSERTING THE DATA Inside  Axios")
            dispatch({
                type: CREATE,
                payload:res.data
            })
           
        })
        .catch(err => console.log(err))

}

export const update = (msgId,data) => dispatch => {     
    console.log("UPDATING THE DATA")
    axios.put('/postmessages/'+msgId,data)
        .then(res => {
            console.log("updating the data inside axios")
            dispatch({
                type: UPDATE,
                payload: res.data
            })
           
        })
        .catch(err => console.log(err))

}

export const Delete = (msgId) => dispatch => {      
    console.log("DELETING DATA")
    axios.delete('/postmessages/'+msgId)
        .then(res => {
            console.log("deleting the data inside axios")
            dispatch({
                type: DELETE,
                payload: msgId
            })
           
        })
        .catch(err => console.log(err))

}



