import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import foodiePic from '../assets/foodienepal.png';
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function Register(props){
    const [checkedTerms, setCheckedTerms] = useState(false);
    const email = useFormInput();
    const password = useFormInput();
    const fullname = useFormInput();
    let history = useHistory();

    function updateCheckbox(e){
        setCheckedTerms(true);
    };

    function register(e){
        e.preventDefault();
        console.log(this.state);

        if(email.value==null && password.value==null && fullname.value==null){
            alert("Please fill all the field");
        }
        else if(email.value==null || password.value==null || fullname.value==null){
            alert("Some field is missing");
        }
        else{
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email.value)) {
                alert("Please enter valid email address.");
            }
            else{
                if(checkedTerms){
                    axios.post('http://localhost:3002/users/signup', {email:email.value, password:password.value, fullname:fullname.value})
                    .then((response) => {
                        console.log(response);
                        if(response.data.status==="exists"){
                            alert("Sorry! email already exists");
                        }
                        else if(response.data.status==="success"){
                            localStorage.setItem('token', response.data.token);
                            localStorage.setItem('fullname', response.data.fullname);
                            alert("Congratulation! you are registered successfully");
                            history.push("/home") 
                        }
                        else{
                            alert("Unknown error!");
                        }
                    }).catch((err) => console.log(err))
                }
                else{
                    alert("Please! accept the terms and condition")
                }
            }

        }
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
                            <Input type="text" name="fullname" {...fullname} id="fullname" placeholder="Enter your fullname" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" {...email} id="exampleEmail" placeholder="Enter email address" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" {...password} id="password" placeholder="Enter password" required/>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input name="checkedTerms" onChange={updateCheckbox} type="checkbox" />{' '}
                            I accept Terms & Conditions
                            </Label>
                        </FormGroup>
                    <Button size="lg" block color="primary" onClick={register}>Submit</Button>
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
    