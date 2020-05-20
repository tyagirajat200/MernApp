
import React, { useEffect, useState } from 'react'
import { BrowserRouter , Route, Switch } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Register from '../components/Register'
import Home from '../components/Home'
import Login from '../components/Login'

import PostMessages from '../components/PostMessages'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../Actions/authentications";
import PrivateRoute from './PrivateRoute'
import { MDBContainer } from 'mdbreact';
import Agenda from '../components/Agenda'



export default function Routes() {
    const[loading ,setLoading]=useState(true)

    const auth = useSelector((state) => {
        return state.auth.isAuthenticated
      })
    const dispatch = useDispatch()
    

    useEffect( ()=>{
         dispatch(setCurrentUser()).then(res=>{
            
                setLoading(false)
            
        })
        console.log("routes set current user")
       

        // eslint-disable-next-line                 
    },[])

    return (
        loading === true ? <h2>loading....</h2> :
        
      
        <div>
            <BrowserRouter >

            <MDBContainer>

           
                <Navbar />
                
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route path="/login"><Login /></Route>
                    <Route path="/register"><Register /></Route>
                    <PrivateRoute  path="/agenda" authenticated={auth} component={Agenda}/>
                    <PrivateRoute  path="/postMessages" authenticated={auth} component={PostMessages}/>

                   
                </Switch>
                </MDBContainer>
            </BrowserRouter>


        </div>
    )
}
