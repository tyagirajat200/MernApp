import React, { useState } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBLink,MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { useDispatch, useSelector } from 'react-redux'
import {logoutUser} from '../Actions/authentications'
import {useHistory} from 'react-router-dom'

const Navbar=(props)=> {

  const [isOpen,setIsopen]=useState(false)


   const history=useHistory()

    const auth=useSelector((state)=>{
      return state.auth.isAuthenticated;
    })

    const dispatch=useDispatch()

    const onLogOut=(e)=>{
      e.preventDefault();
      dispatch(logoutUser(history))
    }

    const toggleCollapse = () => {
      setIsopen(!isOpen);
    };

  return (
    
      <MDBNavbar color="default-color" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Navbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBLink to="/">Home</MDBLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBLink to="/agenda">Features</MDBLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBLink to="/postMessages">PostMessages</MDBLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Dropdown</div>
                </MDBDropdownToggle>
                
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>

{
  !auth &&
    <React.Fragment>
          <MDBNavItem>
              <MDBLink to="/login" link>Login</MDBLink>
            </MDBNavItem>
            <MDBNavItem>
            <MDBLink to="/register">Rgister</MDBLink>
          </MDBNavItem>

      </React.Fragment>
}

{   auth &&
      <MDBNavItem>
            <MDBLink to="/" onClick={onLogOut}>Logout</MDBLink>
      </MDBNavItem>
}



            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret >
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default" right >
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    
    );
  }


export default (Navbar);