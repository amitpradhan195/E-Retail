import React, { Component } from 'react'
import { Alert, Row, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap'
import '../components/Style/popular.css'
import Axios from 'axios'

export default class Popular extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      productName: '',
      productImage: '',
      product:[],
      notes:'',
      quantity:'1',
      popular: [],
      totalprice:'',
      modal:false,
      visible : false,
      config: {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      },
    }
    this.toggle = this.toggle.bind(this);
  }

  onShowAlert = ()=>{
    this.setState({visible:true},()=>{
      window.setTimeout(()=>{
        this.setState({visible:false})
      },2000)
    });
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
    Axios.get('http://localhost:3002/products',this.state.config)
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
            this.toggle();
            this.onShowAlert();
          }).catch((err) => console.log(err.response));
      }
      else{
        alert("Please login to add cart");
      }
    }
  }

    render() {
        return (
           <div style={{backgroundColor:'OldLace'}} className="container">
            <span className='h3' style={{color:'DarkOrange'}}>ITEMS FOR YOU</span>
            <Alert color="info" isOpen={this.state.visible} >
              I am an alert and I will disappear in 2sec.!
            </Alert>
            <Row className="align-center">
              {
                this.state.popular.map((pop => 
                  <div className="Col-md-4" id="product">
                    <figure className="card card-product" onClick={()=>this.handleProduct(pop._id)}>
                      <div className="image_wrap">
                        <img alt="productPic" width="250" src={`http://localhost:3002/uploads/${pop.productImage}`}/>
                      </div>
                      <figcaption className="info-wrap">
                        <label>{pop.productName}</label>
                        <h6 className="title">Rs. {pop.price}</h6>
                      </figcaption>
                    </figure>
                  </div>
                  ))
              }
            </Row>
           

            <Modal isOpen={this.state.modal}>
              <form>
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
              </form>
            </Modal>
          </div>
        )
  }
}
