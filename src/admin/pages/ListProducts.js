import React, { Component } from 'react'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';
import Axios from 'axios'


export default class ListProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
          _id: '',
          productName: '',
          productImage: '',
          price:'',
          imgpreview:null,
          popular: [],
          product: [],
          categories:[],
          brand:[],
          brandSelect:'',
          catSelect:'',
          modal : false,
          isupdated: false,
          config: {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          },
          selectedFile: null,
        }
        this.toggle = this.toggle.bind(this);
    } 
             
    componentDidMount() {
      Axios.get('http://localhost:3002/products',this.config)
        .then((response)=>{
          const data = response.data;
          this.setState({popular:  data});
          this.setState({product: data});
          console.log(this.state.popular);
        }).catch(error => console.log(error.response));

      Axios.get('http://localhost:3002/brands',this.state.config)
      .then((response)=>{
        const data = response.data;
        this.setState({
            brand: data,
            brandSelect:data[0]._id
          });        
      }).catch(error => console.log(error.response));

      Axios.get('http://localhost:3002/categories', this.state.config)
        .then((response)=>{
            const data = response.data;
            this.setState({
                categories:data,
                imgpreview:data.catImg,
                catSelect:data[0]._id
            });
        }).catch(err=>console.log(err.response));
    }

    toggle=()=>{ 
      this.setState({
        modal: !this.state.modal
    })}
        
    handleFileSelect = (e) => {
      this.setState({
        selectedFile: e.target.files[0],
        imgpreview: URL.createObjectURL(e.target.files[0])
      })
    }
     
    uploadFile = (e) => {
      e.preventDefault();
      const data = new FormData()
      data.append('imageFile', this.state.selectedFile)
      Axios.post('http://localhost:3002/uploads', data, this.state.config)
        .then((response) => {
          this.setState({
            productName: this.state.productName,
            price:this.state.price,
            productImage: response.data.filename
          })
        }).catch((err) => console.log(err.response))
    }
     
       
    handleChange = (e)  =>{
      this.setState({
        [e.target.name]: e.target.value 
      })
    }

    deleteProduct(productId){
      Axios.delete(`http://localhost:3002/products/${productId}`, this.state.config)
      .then((response) => {
        console.log(response);
        window.location.reload()   
      })
      .catch(error => console.log(error.response));
    }

    handleEdit = (productId) => {
      this.setState({
        modal: !this.state.modal
      });
      Axios.get(`http://localhost:3002/products/${productId}`,this.state.config)
      .then((response)=>{
        const data = response.data;
          this.setState({
            product: data,
            brandSelect:data.brand,
            catSelect:data.category,
            imgpreview:`http://localhost:3002/uploads/${data.productImage}`
          });    
        console.log("data fecth");
        })
      .catch(error => console.log(error.response));
    }

    handleupdate = (e) =>{
      this.setState({
        product: { ...this.state.product, [e.target.name]: e.target.value }
      })
    }
     
    updateProduct = (productId) => {
      const data = new FormData()
      data.append('imageFile', this.state.selectedFile)
      Axios.post('http://localhost:3002/uploads', data, this.state.config)
        .then((response) => {
          this.setState({
            productImage: response.data.filename
          })
          Axios.put(`http://localhost:3002/products/${productId}`, 
            { 
              productName: this.state.product.productName, 
              price: this.state.product.price,
              productImage: this.state.productImage, 
              brand: this.state.brandSelect,
              category: this.state.catSelect
            }, this.state.config)
          .then((response) => {
            alert("Product updated successfully")
            console.log(response.data)
            window.location.reload();
          })
          .catch((err)=>console.log(err.response))
        })
        .catch((err) => console.log(err.response))
    }
    
    render() 
    {
        return (
            <Table hover>
            <thead>
              <tr>
                <th>Brand Name</th>
                <th>Category</th>
                <th>Product Name</th>
                <th>Product price</th>
                <th>Product image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.popular.map(pop => 
                <tr key={pop._id}>
                  <td>{pop.brand.brand_name}</td>
                  <td>{pop.category.category}</td>
                  <td>{pop.productName}</td>
                  <td>{pop.price}</td>
                  <td>
                    <img alt="productPic" src={`http://localhost:3002/uploads/${pop.productImage}`} style={{height: "50px",width:"50px"}}/>
                  </td>
                  <td>
                    <a className="btn btn-success" onClick={() => this.handleEdit(pop._id)}>Edit</a>
                  </td>
                  <td>
                    <a onClick={() => this.deleteProduct(pop._id)} className="btn btn-danger" href="">Delete</a>
                  </td>
                </tr>
                )
              }
    
              <Modal isOpen={this.state.modal}>
                <ModalHeader toggle={this.toggle}><legend><h3>Update Product</h3></legend></ModalHeader>
                <ModalBody>
                  <form>
                    <div className="form-group">
                      <label for='productName'> Product Name</label>
                      <input type="text" name="productName" className="form-control" 
                        value ={this.state.product.productName} onChange={this.handleupdate}/>
                    </div>
                    <div className="form-group">
                      <label for='price'>Product price</label>
                      <input type="text" name="price" className="form-control"
                        value={this.state.product.price} onChange={this.handleupdate}  />
                    </div>
                    <div className="form-group">
                        <label for='brandOption'>
                            <legend style={{fontSize:16}}>Choose Brand: </legend>
                        </label>
                        {' '}
                        <select onChange={this.handleChange} value={this.state.brandSelect} name='brandSelect' id='brandOption' style={{width:200, textAlign:'center'}}>
                            {
                              this.state.brand.map(option=>
                                  <option key={option._id} value={option._id}>{option.brand_name}</option>
                              )
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label for='catOption'>
                            <legend style={{fontSize:16}}>Choose Product Category: </legend>
                        </label>
                        {' '}
                        <select onChange={this.handleChange} value={this.state.catSelect} name='catSelect' id='catOption' style={{width:200, textAlign:'center'}}>
                          {
                            this.state.categories.map(option=>
                                <option key={option._id} value={option._id}>{option.category}</option>
                            )
                          }
                        </select>
                    </div>
                    <img className='img-thumbnail' width='200' 
                      src={this.state.imgpreview} alt="productImg" />
                    <Input type='file' name='productImage' id='productImg'
                      onChange={this.handleFileSelect} value={this.state.image}/> 
                      <br/>
                    <Button color="primary" block 
                      onClick={() => this.updateProduct(this.state.product._id)}>Update</Button>
                  </form>     
                </ModalBody>
                <ModalFooter></ModalFooter>
              </Modal>
            </tbody>
          </Table>
        )
    }
}
