import React, { useState } from 'react';
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

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [openLogin, setOpenLogin] = useState(false);
  const modalLogin = () => setOpenLogin(!openLogin);

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
            {/* <NavItem>
              <NavLink className="navlinkColor" href="/posts">Posts</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink className="navlinkColor" href="/contact">Contact</NavLink>
            </NavItem>
          </Nav>
          <Button onClick={modalLogin} color="primary">Sign In</Button>
        </Collapse>
      </Navbar>

      <Modal isOpen={openLogin} toggle={modalLogin}>
                <ModalHeader><legend>Login</legend></ModalHeader>
                <ModalBody>
                  <form>
                    <div className="form-group">
                      <label>Email address</label>
                      <input type="text" name="username" className="form-control" placeholder="Username" />
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" name="password" className="form-control" placeholder="Enter password" />
                    </div>
                    
                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" >Submit</button>
                    
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

export default NavBar;
