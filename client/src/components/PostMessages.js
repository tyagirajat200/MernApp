//this is list component
import React, {  useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from 'semantic-ui-react'

import {fetchAll,Delete } from '../Actions/postMessages'

import {
    MDBRow,
    MDBCol,
    MDBContainer,
    MDBListGroup,
    MDBListGroupItem,
    MDBCard,
    MDBBtn
} from "mdbreact";
import '../App.css';

import PostMessageForm from "./PostMessageForm";


function PostMessages(props) {

    const[msgId,setMsgId]=useState(0)
    const dispatch=useDispatch();


// postMessage is reducer name and this reducer return list and if we return only state then it return all reducers
                        
    const postMessagesList= useSelector((state)=>{

        return (state.postMessage.list)        
    })

    const userId=useSelector((state)=>{
        return state.auth.user.id;
      })

   
    

    useEffect(() => {
       // props.fetchAllPostMessages();
       dispatch(fetchAll(userId))
       
       // eslint-disable-next-line 
    }, []); //empty array work as componentDidMount


   const onDelete =(id)=>{
       //props.deletePostMessage(id)
        dispatch(Delete(id))
   }


    return (
        
        <MDBContainer>
            <MDBRow>
                <MDBCol className=".col-md-5" md="5">

                    <PostMessageForm  msgId={msgId} setMsgId ={setMsgId}/>
                </MDBCol>
                <MDBCol className=".col-md-7" md="7">
                    <MDBListGroup>
                        {postMessagesList.map((record, index) => 
                            
                                <React.Fragment key={index}>
                                   
                                    <MDBCard className="card-body" style={{ marginTop: "0rem" }}>
                                        <MDBListGroupItem >{record.title}</MDBListGroupItem>
                                       

                                        <div>
                                            {record.message}
                                        </div>
                                        <div>


                                            <MDBBtn color="primary" size="sm " onClick={()=>setMsgId(record._id)}>Edit</MDBBtn>
                                            <MDBBtn color="primary" size="sm " onClick={()=>onDelete(record._id)}>Delete</MDBBtn>
                                        </div>

                                    </MDBCard>

                                    <Divider></Divider>

                                </React.Fragment>
                            
                        )}
                    </MDBListGroup>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}


export default (PostMessages);      //remove connect if use useDispatch useSelector
