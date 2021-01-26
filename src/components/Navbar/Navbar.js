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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
  Label
} from 'reactstrap';
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { FiLogIn, FiShoppingCart } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";


export default function NavBar(props){
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  let history = useHistory();
  
  const email = useFormInput();
  const password = useFormInput();
  const toggle = () => setIsOpen(!isOpen);
  const modalLogin = () => setOpenLogin(!openLogin);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token!=null){
      setIsLoggedin(true);
    }
    else{
      setIsLoggedin(false);
    }
  },[])

  function handleLogin(e){ 
    e.preventDefault();
    if(email.value==null && password.value==null){
      return alert("Please enter username and password");
    }
    else if(email.value==null || password.value==null){
      return alert("username or password is missing");
    }
    else{
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(email.value)) {
        alert("Please enter valid email address.");
      }
      else{
        Axios.post('http://localhost:3002/users/login', {email:email.value, password:password.value})
        .then((response)=>{
          const role = response.data.role;
          if(response.data.status==='success'){
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('fullname', response.data.fullname)
            localStorage.setItem('role', response.data.role)
            if(response.data.role==="admin"){
              history.push("/adminDashboard");
            }
            else{
              history.push("/home")
            }
          }
          else if(response.data.status==='401'){
            alert("Invalid username or password");
          }
          else{
            alert("unknown Error")
          }
          return role;
        }).catch((err) => console.log(err.response))
      }
    }
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

          </Nav>
          {isLoggedin?(
            <>
            <NavLink className="navlinkColor" href="/viewCart"><FiShoppingCart style={{fontSize:"25px"}}/></NavLink>
            {/* <a href="/viewCart">{FiShoppingCart}</a> */}
            <NavLink className="navlinkColor" href="#">View Order</NavLink>
            <NavLink>
              <UncontrolledDropdown>
                  <DropdownToggle nav caret>
                  <MdAccountCircle style={{fontSize:"30px", marginRight:"5px"}}/>
                  {localStorage.getItem('fullname')}
                  </DropdownToggle>
                  <DropdownMenu right>
                      <DropdownItem href="#">
                      My Profile
                      </DropdownItem>
                      <DropdownItem onClick={handleLogout}>
                      Log Out
                      </DropdownItem>
                  </DropdownMenu>
              </UncontrolledDropdown>
            </NavLink>
            </>
          ):(
            <Button onClick={modalLogin} color="primary"><FiLogIn style={{fontSize:"25px", marginRight:'5px'}}/>Log In</Button>
          )}
        </Collapse>
      </Navbar>

      <Modal isOpen={openLogin} toggle={modalLogin}>
                <ModalHeader><legend>Login</legend></ModalHeader>
                <ModalBody>
                  <Form>
                    <div className="form-group">
                      <Label>Email Id</Label>
                      <Input type="email" {...email} className="form-control" placeholder="Enter email" required/>
                    </div>

                    <div className="form-group">
                      <Label>Password</Label>
                      <Input type="password" {...password} className="form-control" placeholder="Enter password" required/>
                    </div>
                    
                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <Input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <Label className="custom-control-label" htmlFor="customCheck1">Remember me</Label>
                      </div>
                    </div>
                    <Button type="submit" onClick={handleLogin} color="primary" size="lg" block>Log In</Button>
                  </Form>
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
