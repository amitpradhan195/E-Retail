import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import foodiePic from '../../assets/foodienepal.png';

const register = (props) => {
  return (
    <div className="container text-left">
        <br/>
        <h1 color='blue'>Register</h1>
        <hr/>
        <Row>
            <Col md={6}>
                <Form>
                    <FormGroup>
                        <Label for="examplePassword">Full name</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="Enter your fullname" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Enter email address" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="Enter password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleFile">Choose profile...</Label>
                        <Input type="file" name="file" id="exampleFile" />
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
                <Button size="lg" block color="primary">Submit</Button>
                <p>Already have an account? <a href="/">Log In</a></p>
                </Form>
            </Col>
            <Col md={6}>
                <img src={foodiePic} alt="foodiePic" width="500px"/>
            </Col>
        </Row>
        
    </div>
  );
}

export default register;
