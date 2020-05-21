import React, { useState, useEffect } from 'react'

import {
    MDBContainer, MDBRow, MDBCol, MDBBadge, MDBIcon, MDBBtn, MDBModal,MDBInput,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter
} from "mdbreact";

import { useDispatch ,useSelector} from 'react-redux';
import { fetchAll,Delete,create } from "../Actions/agenda";
import axios from "axios";






const initialFieldValues={
    title:"",
    time:"",
    location:"",
    description:""
}

const Dweather={
    temp:"",
    main:"",
    icon:"",
}

function Agenda() {
    const [modal, setModal] = useState(false)
    const[values,setValues]=useState(initialFieldValues)
    const[weather,setWeather]=useState(Dweather)
  

    const dispatch =useDispatch()

    const events=useSelector((state)=>{
        return state.events.lists
    })


    useEffect(() => {
        dispatch(fetchAll())

        axios.get("https://api.openweathermap.org/data/2.5/weather?q=Manali,Himachal Pradesh,IN&appid=f7d946f240c481c1b1fab1b44944ca20&units=metric")
	.then(res => {
        setWeather({
            main:res.data.weather[0].main,
            temp:res.data.main.temp,
            icon:res.data.weather[0].icon
        })
        
	})
	.catch(err => {
		console.log("Can Not fetch")
    }); 
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });

    
        // eslint-disable-next-line 
     }, []);

   




    const handleDelete = eventId => {
        
        dispatch(Delete(eventId))
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleInputChange=(event)=>{
        const{name,value}=event.target
        setValues({
            ...values,
            [name]:value
        })
    }

    const addEvent=(event)=>{
       
        dispatch(create(values))
       setValues(initialFieldValues)

    }

    const location = async () => {
        await navigator.geolocation.getCurrentPosition(
          position => console.log(position), 
          err => console.log(err)
        );
      
      }

    return (
        <React.Fragment>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="9" className="mb-r">
                        <h2 className="text-uppercase my-3">Today:</h2>
                        <div id="schedule-items">
                            {events.map(event => (
                                <Event
                                    key={event._id}
                                    id={event._id}
                                    time={event.time}
                                    title={event.title}
                                    location={event.location}
                                    description={event.description}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                        <MDBRow className="mb-4">
                            <MDBCol xl="3" md="6" className="mx-auto text-center">
                                <MDBBtn color="info" rounded onClick={toggleModal}>
                                    Add Event
                            </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol md="3">
                        <h3 className="text-uppercase my-3">Schedule</h3>
                        <h6 className="my-3">
                            It's going to be busy that today. You have{" "}
                            <b>{events.length} events </b> today.
                      </h6>
                        <h1 className="my-3">
                            <MDBRow>
                                <MDBCol xs="3" className="text-center">
                                <img src={`https://openweathermap.org/img/w/${weather.icon}.png`} alt="" />
                                    
                                </MDBCol>
                            <MDBCol xs="9">{weather.main}</MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol xs="3" className="text-center">
                                    <MDBIcon icon="thermometer-three-quarters" fixed />
                                </MDBCol>
                            <MDBCol xs="9">{weather.temp}</MDBCol>
                            </MDBRow>
                        </h1>
                        <p>
                            Don't forget your sunglasses. Today will dry and sunny, becoming
                            warm in the afternoon with temperatures of between 20 and 25
                            degrees.
                            <MDBBtn onClick={location}>click me</MDBBtn>
                      </p>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <MDBModal isOpen={modal} toggle={toggleModal}>
                <MDBModalHeader
                    className="text-center"
                    titleClass="w-100 font-weight-bold"
                    toggle={toggleModal}
                >
                    Add new event
          </MDBModalHeader>
          <MDBModalBody>
      <form className="mx-3 grey-text">
          <MDBInput
            name="time"
            label="Time"
            icon="clock"
            hint="12:30"
            group
            type="text"
            value={values.time}
            onChange={handleInputChange}
          />
          <MDBInput
            name="title"
            label="Title"
            icon="edit"
            hint="Briefing"
            group
            type="text"
            value={values.title}
            onChange={handleInputChange}
          />
          <MDBInput
            name="location"
            label="Location (optional)"
            icon="map"
            group
            type="text"
            value={values.location}
            onChange={handleInputChange}
          />
          <MDBInput
            name="description"
            label="Description (optional)"
            icon="sticky-note"
            group
            value={values.description}
            type="textarea"
            
            onChange={handleInputChange}
          />
        </form>
      </MDBModalBody>
      <MDBModalFooter className="justify-content-center">
    <MDBBtn
      color="info"
      onClick={() => {
        toggleModal();
        addEvent();
      }}
    >
      Add
    </MDBBtn>
  </MDBModalFooter>
            </MDBModal>
        </React.Fragment>

    )
}

function Event(props) {
    return (
        <React.Fragment>
            <div className="media mt-1">
                <h3 className="h3-responsive font-weight-bold mr-3">
                    {props.time}
                </h3>
                <div className="media-body mb-3 mb-lg-3">
                    <MDBBadge color="danger" className="ml-2 float-right" onClick={() => props.onDelete(props.id)}>
                        -
            </MDBBadge>
                    <h6 className="mt-0 font-weight-bold">{props.title} </h6>{" "}
                    <hr className="hr-dark my-2" />
                    {props.location && (
                        <React.Fragment>
                            <p className="font-smaller mb-0">
                                <MDBIcon icon="location-arrow" /> {props.location}
                            </p>
                        </React.Fragment>
                    )}
                </div>
            </div>
            {props.description && (
                <p className="p-2 mb-4  blue-grey lighten-5 blue-grey lighten-5">
                    {props.description}
                </p>
            )}
        </React.Fragment>
    )
}

export default Agenda
