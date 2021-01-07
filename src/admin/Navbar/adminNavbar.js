import React, { Component } from 'react'
import {Navbar,NavbarBrand,NavbarToggler,Collapse,Nav,NavItem,NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem, NavbarText} from 'reactstrap';
import './adminnavbar.css';


export default class AdminNavbar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             sidenavbar:false,
             isOpen:false,
             username:'',
             config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
              },
        }
    }
     
    toggle(){
        this.setState({
          isOpen: !this.state.isOpen
        })
    }

    componentDidMount(){
        this.setState({
            username:localStorage.getItem('username')
        })
    }
    
    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.clear();
        if (localStorage.getItem('token') == null) {
          window.location.href="/"
        }
      }
    
    render() {
            return (
                <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/admin"><h3 style={{color:'DarkTurquoise'}}>FOODIE NEPAL</h3></NavbarBrand>
                    <NavbarToggler onClick={this.toggle.bind(this)} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/adminDashboard">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Restaurants</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Foods</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Food Category</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Options
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem href="#">
                            View User
                            </DropdownItem>
                            <DropdownItem onClick={this.handleLogout}>
                            Log Out
                            </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <NavbarText>Welcome, {this.state.username}</NavbarText>
                    </Collapse>
                </Navbar>
                </div>   
            )

    }
}
