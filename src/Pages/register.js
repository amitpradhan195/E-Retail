import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import foodiePic from '../assets/foodienepal.png';
import axios from 'axios'
import { Redirect } from 'react-router-dom';

export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fullname: '',
            email:'',
            password: '',
            isRegistered: false
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = (e) => {
        e.preventDefault();
        console.log(this.state);

        axios.post('http://localhost:3002/users/signup', this.state)
            .then((response) => {
                console.log(response);
                if(response.data.status==="exists"){
                    alert("Sorry! email already exists");
                }
                else if(response.data.status==="success"){
                    localStorage.setItem('token', response.data.token)
                    this.setState({
                        fullname: '',
                        email:'',
                        password: '',
                        isRegistered: true
                    });
                    alert("Congratulation! you are registered successfully");
                    this.props.history.push("/home") 
                }
                else{
                    alert("Unknown error!");
                }
            }).catch((err) => console.log(err))
    }

    render(){
        return (
            <div className="container text-left">
                <br/>
                <h1 color='blue'>Register</h1>
                <hr/>
                <Row>
                    <Col md={6}>
                        <Form>
                            <FormGroup>
                                <Label for="fullname">Full name</Label>
                                <Input type="text" name="fullname" id="fullname" value={this.state.fullname} onChange={this.handleChange}  placeholder="Enter your fullname" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" value={this.state.email} onChange={this.handleChange} placeholder="Enter email address" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter password" />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                <Input type="checkbox" />{' '}
                                I accept Terms & Conditions
                                </Label>
                            </FormGroup>
                        <Button size="lg" block color="primary" onClick={this.register}>Submit</Button>
                        <p>Already have an account? <a href="/">Log In</a></p>
                        </Form>
                    </Col>
                    <Col md={6}>
                        <img src={foodiePic} className="fluid" alt="foodiePic" width="400px"/>
                    </Col>
                </Row>
            </div>
          );
    }
}