
import React, { useState, useEffect } from "react";
import { MDBContainer, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBLink, MDBAlert } from 'mdbreact';
import { loginUser } from "../Actions/authentications";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from 'react-router-dom'


const initialFieldValues = {
  email: "",
  password: "",
  error1: ""

}

const Login = (props) => {

  const history = useHistory()

  const [values, setValues] = useState(initialFieldValues);

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const error = useSelector((state) => {
    return state.errors.error

  })

  const dispatch = useDispatch()

  const handleSubmit = (event) => {

    event.preventDefault()

    dispatch(loginUser(values))

  }


  const auth = useSelector((state) => {
    return state.auth.isAuthenticated
  })

  useEffect(() => {
    if (auth) {
      console.log("auth value changed to " + auth)          //  push user to Home when they click onlogin and also if he aready log in
      history.push('/')
    }
    setValues({
      ...values,
      error1: error
    })
        // eslint-disable-next-line   
  }, [auth, error])   //    use effect only runs when value of auth changed

  useEffect(() => {

    setValues(initialFieldValues)
    console.log("run after every rendering")
  }, [])





  return (
    <MDBContainer>

      <MDBCol md="6" style={{ margin: "10% auto" }}>
        <MDBCard color="" >
          <MDBCardBody>
            <form onSubmit={handleSubmit}>
              <p className="h4 text-center py-4">Login</p>
              {values.error1 ? (<MDBAlert color="danger" >  {values.error1}  </MDBAlert>) : null}
              <div className="grey-text" >

                <MDBInput
                  label="Your email"
                  icon="envelope"
                  group
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleInputChange}

                />

                <MDBInput
                  label="Your password"
                  name="password"
                  icon="lock"
                  group
                  type="password"
                  value={values.password}
                  onChange={handleInputChange}

                />
              </div>

              <div className="text-center py-4 mt-3">
                <MDBBtn color="cyan" type="submit">
                  Login
                  </MDBBtn>
              </div>

              <div style={{ textAlign: "right" }}>

                <MDBLink to='/register' >
                  Don't have an account? Sign Up
                   </MDBLink>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>

    </MDBContainer>
  );
};

export default Login;