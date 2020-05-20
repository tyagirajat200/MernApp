import axios from 'axios';
import { ADD_EVENTS,DELETE_EVENTS,GET_EVENTS} from './types'


export const fetchAll = () => (dispatch) => {
    console.log("FETCHING ALL DATA")
    axios.get('/agenda/getEvents')
        .then(res => {
            console.log("fetcjing data inside axios")
            dispatch({
                type: GET_EVENTS,
                payload: res.data
            })
            
        })
        .catch(err => console.log(err))
}

export const create = (data ) => dispatch => { 
    console.log("INSERTING THE DATA",data)
    axios.post('/agenda/addEvents', data)
        .then(res => {
            console.log("INSERTING THE DATA Inside  Axios")
            dispatch({
                type: ADD_EVENTS,
                payload:res.data
            })
           
        })
        .catch(err => console.log(err))

}

export const Delete = (eventId) => dispatch => {      
    console.log("DELETING DATA")
    axios.delete('/agenda/'+eventId)
        .then(res => {
            console.log("deleting the data inside axios")
            dispatch({
                type: DELETE_EVENTS,
                payload: eventId
            })
           
        })
        .catch(err => console.log(err))

}