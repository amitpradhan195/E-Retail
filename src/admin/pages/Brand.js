import React, { Component } from 'react'
import { Label, FormGroup, Button, Input } from 'reactstrap'
import Axios from 'axios'
import ListBrands from './ListBrands';
import AdminNavbar from '../Navbar/adminNavbar';

export default class AddBrand extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       brand_name: null,
       productItem: null,
       brand_image: null,
       product : [],
       imgPreview:null,
       config: {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    },
    selectedFile: null,
    }
    this.handleFileSelect = this.handleFileSelect.bind(this)
  }

    handleFileSelect = (e) => {
      this.setState({
        selectedFile: e.target.files[0],
        imgPreview:URL.createObjectURL(e.target.files[0])
      })
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleFoodChange = (e) => {
      this.setState({
        productItem : e.target.value
      });
    }

    addBrand = (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append('imageFile',this.state.selectedFile)
      Axios.post('http://localhost:3002/uploads', data, this.state.config)
      .then((response) => {
          this.setState({
              brand_image: response.data.filename
          })
          Axios.post('http://localhost:3002/brands',this.state,this.state.config)
          .then((response) => {
            alert("Brand added successfully");
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
          <h2 style={{color:'#34495E'}}>Add Brands</h2><hr/>
          <div className="row">
            <div className="col-md-8">
              <form style={{backgroundColor:'#EAF2F8'}} className="p-3">
                <FormGroup>
                  <Input type='text' id="brandName" name='brand_name' value={this.state.brand_name}
                    onChange={this.handleChange} placeholder="Enter brand name" required/>
                </FormGroup>
                  <FormGroup style={{display: "ruby"}}>
                    <Label className="btn btn-outline-info float-left" htmlFor="filePicker">Upload image for brand</Label>
                    <Input id="filePicker" style={{visibility:"hidden"}} type='file' name='brand_image' onChange={this.handleFileSelect}/>
                  </FormGroup>
                  <Button color='success' onClick={this.addBrand} block>Add Brand</Button>
              </form>
            </div>
            <div className="col-md-4 flex">
              <img alt="Image Preview" 
              style={{display:'block', border: '1px solid gray', width:"200px", textAlign:'center'}} 
              src={this.state.imgPreview}/><br/>
            </div>
          </div>
              <hr></hr>
              <h2 style={{color:'#34495E'}}>View Brands</h2>
            <ListBrands />
          </div>
          </>
        )
      }
    }

