import React, { Component } from 'react'
import {Row,Col,Modal,ModalHeader,ModalBody,ModalFooter,Container} from  'reactstrap';
import Axios from 'axios'
import   '../components/Style/category.css';
import { FiSearch } from "react-icons/fi";

export default class Category extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            category:[],  
            products:[],
            product:[],
            catName:'',
            notes:'',
            quantity:'1',
            totalprice:'',
            searchedProducts:'',
            modal:false,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({
          modal:!this.state.modal
        })
    }  

    componentDidMount() {
        Axios.get('http://localhost:3002/categories', this.state.config)
          .then((response) => {
            console.log(response.data)
            this.setState({
              category: response.data
            })
          })
          .catch((err) => console.log(err.response));
    }

    searchFood=(catId, catName)=>{
       Axios.get(`http://localhost:3002/products/searchByCat/${catId}`, this.state.config)
        .then((response)=>{
            const data=response.data
            if(data[0]!=null){
                this.setState({
                    products:response.data,
                    catName:'Results for : '+ catName
                })
                console.log(this.state.catName)
            }
            else{
                this.setState({
                    catName :'No results found for : '+ catName,
                    products:[]
                })   
            }
        })
    }

    handleProduct = (productId) => {
        this.setState({
          modal: !this.state.modal
    
        })
        Axios.get(`http://localhost:3002/products/${productId}`, this.state.config)
          .then((response) => {
            const data = response.data;
            this.setState({
              product: data,
              totalprice: data.price
            });
            console.log("data fecth");
          }).catch(error => console.log(error.response));
    }

    addCart(){
        if(this.state.quantity<1){
          alert("Please Enter a valid quantity")
        }
        else{
          if(localStorage.getItem('token')!=null){
            Axios.post(`http://localhost:3002/cart/`,
              {
                product: this.state.product._id,
                totalprice: (this.state.totalprice * this.state.quantity),
                notes: this.state.notes,
                quantity: this.state.quantity
              }, this.state.config)
              .then((response) => {
                console.log(response);
                this.setState({
                  modal: !this.state.modal
                })
              }).catch((err) => console.log(err.response));
          }
          else{
            alert("Please login to add cart");
          }
        }
    }

    searchbyName=(e)=>{
        if(e.target.value!=null){
            console.log(e.target.value)
            Axios.get(`http://localhost:3002/products/searchByName/${e.target.value}`, this.state.config)
            .then((response)=>{
                const data = response.data.product;
                console.log(response.data.product)
                if(data.length!==0){
                    this.setState({
                        products:data,
                        searchedProducts:'Results for : '+ e.target.value
                    })
                }
                else{
                    this.setState({
                        products:null,
                        searchedProducts:'No Results found for : '+e.target.value
                    })
                }
            }).catch((err)=>console.log(err.response))
        }
    }


    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <Row>
                        <Col md={12}>
                            <input style={{border: 'none',
                                borderBottom: '2px solid #1ABC9C'}} 
                                type="text" name="search" id="search" placeholder="search product..." 
                                onChange={this.searchbyName}/>
                            <FiSearch style={{fontSize:"30px", opacity:0.6}}/>
                        </Col>
                    </Row>
                    <br/>
                    
                    <Row>
                        {this.state.category.map(catIcon =>
                        <Col>
                            <div key={catIcon._id}>
                                <img alt="catPic" onClick={()=>this.searchFood(catIcon._id, catIcon.category)} 
                                    style={{marginLeft:30, width:'40px', height:'40px'}}
                                    className="categoryList"
                                    src ={`http://localhost:3002/uploads/${catIcon.categoryImg}`} id="catImg"/> 
                            </div>
                        </Col>
                        )}
                    </Row>    
                </div>
                <hr/>
                <div className="container">
                    <h3 style={{color:'FireBrick'}}>{this.state.catName?this.state.catName:''}</h3>
                    <h3 style={{color:'FireBrick'}} className="text-left">{this.state.searchedProducts?this.state.searchedProducts:''}</h3>
                    <Row>
                        {this.state.products!=null ?                     
                        this.state.products.map((pop => 
                            <div className="Col-md-4" id="product">
                              <figure className="card card-product" onClick={()=>this.handleProduct(pop._id)}>
                                <div className="image_wrap">
                                  <img alt="productPic" src={`http://localhost:3002/uploads/${pop.productImage}`}/>
                                </div>
                                <figcaption class="info-wrap">
                                  <h4 class="title">{pop.productName}</h4>
                                  <h6 className="title">Rs. {pop.price}</h6>
                                </figcaption>
                              </figure>
                            </div>
                            )):''}
                    </Row>
                </div>

                <Modal isOpen={this.state.modal}>
                    <ModalHeader toggle={this.toggle}>Item : {this.state.product.productName}<br/>
                            Price : Rs.{this.state.product.price}
                    </ModalHeader>
                    <ModalBody>
                        <p>Add notes</p>
                        <textarea id="notes" className="col-md-10" value={this.state.notes} placeholder="Type here for more description..." name="notes" onChange={this.handleChange}></textarea>
                        <hr/>
                        <p>Add quantity</p>
                        <input type="number" pattern="[0-9]*" name="quantity" min={1} value={this.state.quantity} onChange={this.handleChange} min="1" max="100" />
                    </ModalBody>
                    <ModalFooter>
                        <Container id="ftr">
                        <button className="btn btn-lg btn-success" id="btnbag" onClick={() => this.addCart(this.state.product._id)}>Add to cart</button>
                        </Container>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
