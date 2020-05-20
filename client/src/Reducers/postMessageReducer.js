
import { CREATE,FETCH_ALL,UPDATE,DELETE } from '../Actions/types'

const initialState={

list:[]                              

}
////  inside redux store list is stored as postMessage.list    here postMessage is  reducer


//value of the action parameter is object that comes from  postMessage Action file i.e type and payload
export default function(state=initialState,action){
    
    switch (action.type) {
        case FETCH_ALL:
            return {
                ...state,    // to remain other values of state as same but here is only one value
                list:[...action.payload]

            }

        case CREATE:
            return{
                ...state,
                list:[...state.list,action.payload]
            }
            

        case UPDATE:
            return{
                ...state,
                list:state.list.map((data,index)=> data._id===action.payload._id?  action.payload : data

                                    //here data is only one record of list  and it have to change when update occurs
                )
                
            }

        case DELETE:
            return{
                ...state,
                list:state.list.filter((data) => data._id !== action.payload)   //this filter returns values which satify the condition
            }
        default:
            return state
    }

    }