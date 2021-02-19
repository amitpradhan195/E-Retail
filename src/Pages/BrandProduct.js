import React, { Component } from 'react'
import { Row, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap'
import '../components/Style/popular.css';
import Axios from 'axios';
import UserNavbar from "../components/Navbar/Navbar";

export default class BrandProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productName: '',
            productImage: '',
            totalprice:'',
            price:'',
            notes:'',
            quantity:'1',
            popular: [],
            product:[],
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
  
    handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
    }

    componentDidMount() {
      let brandId = this.props.match.params.id;
      console.log("Brand ID: "+brandId)
      Axios.get(`http://localhost:3002/products/searchByBrand/${brandId}`,this.config)
      .then((response)=>{
        const data = response.data;
        this.setState({popular:  data});
        console.log("data fecth");
      }).catch(error => console.log(error.response));
    }

    handleProduct = (productId) => {
      // if(localStorage.length===0) {
      //   alert("Please login first...")
      // }
      // else{
      this.toggle();
      
      Axios.get(`http://localhost:3002/products/${productId}`, this.state.config)
        .then((response) => {
          const data = response.data;
          this.setState({
            product: data,
            totalprice: data.price
          });
          console.log("data fecth");
        }).catch(error => console.log(error.response));
      // }
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

    render() {
        return (
          <>
            <UserNavbar/>
            <div className="container">
              <h1>Product Available</h1>              
              <Row>
                {
                  this.state.popular.map((pop => 
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
                  ))
                }
              </Row>
              <hr></hr>  

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
            </>
          )
    }
}

