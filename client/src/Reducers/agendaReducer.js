
import { GET_EVENTS,DELETE_EVENTS, ADD_EVENTS } from '../Actions/types'

const initialState={

lists:[]                              

}
////  inside redux store list is stored as postMessage.list    here postMessage is  reducer


//value of the action parameter is object that comes from  postMessage Action file i.e type and payload
export default function(state=initialState,action){
    
    switch (action.type) {
        case GET_EVENTS:
            return {
                ...state,    // to remain other values of state as same but here is only one value
                lists:[...action.payload]

            }

        case ADD_EVENTS:
            return{
                ...state,
                lists:[...state.lists,action.payload]
            }
            

        

        case DELETE_EVENTS:
            return{
                ...state,
                lists:state.lists.filter((data) => data._id !== action.payload)   //this filter returns values which satify the condition
            }
        default:
            return state
    }

    }