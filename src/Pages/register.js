import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import foodiePic from '../assets/foodienepal.png';
import { postRegister } from "../helpers/requests";

export default function Register(props){
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [profilePic, setProfile] = useState('');

    function handelFullnameChange(e){
        setFullname(e.target.value);
    }

    function handelEmailChange(e){
        setEmail(e.target.value);
    }

    function handelPassChange(e){
        setPass(e.target.value);
    }

    function handelProfile(e){
        setProfile(e.target.value);
    }

    function register(e){
        e.preventDefault();
        console.log(this.state);

        
    }
    

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
                        <Input type="text" name="fullname" id="fullname" value={fullname} onChange={handelFullnameChange} placeholder="Enter your fullname" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Enter email address" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Enter password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="file">Choose profile...</Label>
                        <Input type="file" name="file" id="file" />
                        <FormText color="muted">
                        Choose your profile pic.
                        </FormText>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox" />{' '}
                        I accept Terms & Conditions
                        </Label>
                    </FormGroup>
                <Button size="lg" block color="primary" onClick={register}>Submit</Button>
                <p>Already have an account? <a href="/">Log In</a></p>
                </Form>
            </Col>
            <Col md={6}>
                <img src={foodiePic} className="fluid mt-4" alt="foodiePic" width="400px"/>
            </Col>
        </Row>
        
    </div>
  );
}
