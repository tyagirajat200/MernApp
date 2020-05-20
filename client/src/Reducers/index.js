import {combineReducers} from 'redux'
import errorReducer from './errorReducer';
import authReducer from './authReducer'
import   postMessageReducer  from './postMessageReducer'
import agendaReducer from './agendaReducer';


export const rootReducer=combineReducers({
    auth:authReducer,
    errors: errorReducer,
    postMessage:postMessageReducer,
    events:agendaReducer
})

 //we can pass here other reducers here also in same way we can change name here also