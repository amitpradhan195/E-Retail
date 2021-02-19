import React, { Component } from 'react'
import { Button, FormGroup, Label, Row, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form, Col } from 'reactstrap'
import axios from 'axios'
import ListFoods from './ListProducts'
import AdminNavbar from '../Navbar/adminNavbar';
import { MdAdd } from "react-icons/md";
import NumberFormat from "react-number-format";

export default class AddFood extends Component {

    constructor(props) {
        super(props)

        this.state = {
            _id: null,
            productName: null,
            price : null,
            productImage: null,
            brand:[],
            categories:[],
            brandSelect:'',
            catSelect:'',
            modal:false,
            imgPreview:null,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            selectedFile: null,
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle(){
        this.setState({
            modal:!this.state.modal
        })
    }

    componentDidMount() {
        axios.get('http://localhost:3002/brands',this.state.config)
        .then((response)=>{
          const data = response.data;
          this.setState({
              brand: data,
              brandSelect:data[0]._id
            });        
        }).catch(error => console.log(error.response));

        axios.get('http://localhost:3002/categories', this.state.config)
        .then((response)=>{
            const data = response.data;
            this.setState({
                categories:data,
                imgPreview:data.catImg,
                catSelect:data[0]._id
            });
        }).catch(err=>console.log(err.response));
      }
    
    handleFileSelect  = (e) =>{
        this.setState({
            selectedFile: e.target.files[0],
            imgPreview:URL.createObjectURL(e.target.files[0])
        })
    }

    handleChange = (e)  =>{
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    addCat = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('imageFile', this.state.selectedFile)
        axios.post('http://localhost:3002/uploads', data, this.state.config)
            .then((response) => {
                this.setState({
                    categoyImg: response.data.filename
                })
            axios.post('http://localhost:3002/categories',
            {
              category:this.state.category,
              categoyImg:this.state.categoyImg
            }, this.state.config)
                .then((response)=>{
                    console.log(response)
                    alert("Category added successfully")
                    window.location.reload()
                }).catch((err)=>console.log(err.response))
            }).catch((err) => console.log(err.response))
    }
  
    addProduct = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('imageFile', this.state.selectedFile)
        axios.post('http://localhost:3002/uploads', data, this.state.config)
            .then((response) => {
                this.setState({
                    productImage: response.data.filename
                })
                axios.post('http://localhost:3002/products', 
                {
                    productName:this.state.productName,
                    price:this.state.price,
                    productImage:this.state.productImage,
                    brand:this.state.brandSelect,
                    category:this.state.catSelect
                }, this.state.config)
                    .then((response) => {
                        console.log(response);
                        alert("Product added successfully")
                        window.location.reload();
                    })
                    .catch((err) => console.log(err.response))
            }).catch((err) => console.log(err.response))
    }

    render() {      
        return (
            <>
            <AdminNavbar/>
            <div className="container">
                <Row>
                    <Col md={6} className="text-left mt-4">
                        <h2 style={{color:'Crimson'}}>Add Product Item</h2>
                    </Col>
                    <Col md={6} className="text-right mt-4">
                        <Button color='primary' onClick={this.toggle}>
                            <MdAdd style={{fontSize:"30px", color:"white"}} />
                            Add Category
                        </Button>
                    </Col>
                </Row>
                <hr/>
                <Form style={{backgroundColor:'#EAF2F8'}} className="col-10">
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label for='productName'>
                                    <legend style={{fontSize:18}}>Product Name</legend>
                                </Label>
                                <Input type='text' id="productName" name='productName' onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for='price'>
                                    <legend style={{fontSize:18}}>Product price</legend>
                                </Label>
                                <NumberFormat id='price' name='price'
                                    customInput={Input} 
                                    onChange={ this.handleChange}
                                    thousandSeparator 
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <FormGroup className="mt-1">
                                <Label for='brandOption'>
                                    <legend style={{fontSize:18}}>Choose Brand: </legend>
                                </Label>
                                <select onChange={this.handleChange} value={this.state.brandSelect} name='brandSelect' id='brandOption' style={{width:200, textAlign:'center'}}>
                                    {
                                        this.state.brand.map(option=>
                                            <option key={option._id} value={option._id}>{option.brand_name}</option>
                                        )
                                    }
                                </select>
                            </FormGroup>
                        </Col>
                        <Col md={4} className="mt-1">
                            <FormGroup>
                                <Label for='catOption'>
                                    <legend style={{fontSize:18}}>Choose Category: </legend>
                                </Label>
                                <span> </span>
                                <select onChange={this.handleChange} value={this.state.catSelect} name='catSelect' id='catOption' style={{width:200, textAlign:'center'}}>
                                {
                                    this.state.categories.map(option=>
                                        <option key={option._id} value={option._id}>{option.category}</option>
                                    )
                                }
                                </select>
                                {' '}
                            </FormGroup>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md={3}>
                            <FormGroup style={{display: "ruby"}}>
                                <Label className="btn btn-outline-info float-left" htmlFor="filePicker">Upload image for product</Label>
                                <Input id="filePicker" style={{visibility:"hidden"}} type='file' name='productImage' onChange={this.handleFileSelect}/>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <img alt="Img Preview" style={{width:200}} src={this.state.imgPreview}/><hr/>
                         </Col>
                    </Row>
                    <Button color='success' onClick={this.addProduct} block>Add Product</Button>
                <hr/>
                </Form>
              <ListFoods />

              <Modal isOpen={this.state.modal}>
                <ModalHeader toggle={this.toggle}><legend>Add Product Category</legend></ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Input type="text" placeholder="Enter category name" name="category" onChange={this.handleChange} />
                  </FormGroup>
                  <FormGroup style={{display: "ruby"}}>
                    <Label className="btn btn-outline-info float-left" htmlFor="filePicker">Upload image for product category</Label>
                    <Input id="filePicker" style={{visibility:"hidden"}} type='file' name='catImg' onChange={this.handleFileSelect}/>
                    <img alt="Image Preview"
                      style={{display:'block', border: '1px solid gray', width:"200px", height:"200px", textAlign:'center'}} 
                      width='200' src={this.state.imgPreview}
                    />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-success btn-block" id="btnbag" onClick={this.addCat}>Add Category</button>
                </ModalFooter>
              </Modal>
            </div>
            </>
            )
        }    
    }
    
