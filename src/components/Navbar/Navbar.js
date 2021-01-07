import React, { useState, useEffect } from 'react';
import './Navbar.css';
import {
  Collapse,
  Navbar,
  Button,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import Axios from "axios";
import { Redirect } from 'react-router-dom';
import { FiLogIn, FiLogOut } from "react-icons/fi";

export default function NavBar(props){
  const [isRegistered, setIsRegistered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  
  const email = useFormInput();
  const password = useFormInput();
  const toggle = () => setIsOpen(!isOpen);
  const modalLogin = () => setOpenLogin(!openLogin);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token!=null){
      setIsRegistered(true);
    }
    else{
      setIsRegistered(false);
    }
  })

  function handleLogin(e){ 
    console.log({email:email, password:password});
    e.preventDefault();
    Axios.post('http://localhost:3002/users/login')
      .then((response)=>{
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('email', response.data.email)
        // if(response.data.role==='admin'){
        //   return <Redirect to='/admin' />
        // }else if (this.state.role === 'customer') {
        //   return <Redirect to='/home' />
        // }
        console.log(response.data)
        if(response.data.status==='success'){
          alert("Login Successful");
        }
        else{
          alert("response.data.err");
        }
    }).catch((err) => console.log(err.response))
  }

  function handleLogout(e){
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.clear();
    if (localStorage.getItem('token') == null) {
      window.location.href = "/"
    }
  }

  return (
    <div>
      <Navbar className="navStyle" sticky expand="md">
        <NavbarBrand className="brandText" href="/">FOODIE NEPAL</NavbarBrand>
        <NavbarToggler className="togglerMenu" onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="navlinkColor" href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="navlinkColor" href="/services">Foods</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="navlinkColor" href="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="navlinkColor" href="/contact">Contact</NavLink>
            </NavItem>
          </Nav>
          {isRegistered?(
            <Button onClick={handleLogout} color="danger"><FiLogOut style={{fontSize:"25px", marginRight:'5px'}}/>Log Out</Button>
          ):(
            <Button onClick={modalLogin} color="primary"><FiLogIn style={{fontSize:"25px", marginRight:'5px'}}/>Log In</Button>
          )}
        </Collapse>
      </Navbar>

      <Modal isOpen={openLogin} toggle={modalLogin}>
                <ModalHeader><legend>Login</legend></ModalHeader>
                <ModalBody>
                  <form>
                    <div className="form-group">
                      <label>Email Id</label>
                      <input type="text" {...email} className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" {...password} className="form-control" placeholder="Enter password" />
                    </div>
                    
                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                      </div>
                    </div>
                    <button type="submit" onClick={handleLogin} className="btn btn-primary btn-block" >Log In</button>
                  </form>
                </ModalBody>
                <ModalFooter className="float-left" align="center">
                    <a className="forgot-password ">Forgot password?</a>
                    <p className=""> Not registered yet? <a href="/register">sign up?</a></p>
                </ModalFooter>     
              </Modal>
    </div>
  );
}

function useFormInput(initialValue){
  const [value, setValue] = useState(initialValue)

  function handleChange(e){
    setValue(e.target.value);
  }

  return {
    value,
    onChange:handleChange
  };
}
