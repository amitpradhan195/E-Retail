import React, { Component } from 'react'
import {Row,Col,Modal,ModalHeader,ModalBody,ModalFooter,Container} from  'reactstrap';
import Axios from 'axios'
import   '../components/Style/category.css';

export default class Category extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            category:[],  
            foods:[],
            food:[],
            catName:'',
            notes:'',
            quantity:'',
            totalprice:'',
            searchedFoods:[],
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
        Axios.get('http://localhost:3002/foodCat', this.state.config)
          .then((response) => {
            console.log(response.data)
            this.setState({
              category: response.data
            })
          })
          .catch((err) => console.log(err.response));
    }

    searchFood=(catId, catName)=>{
       Axios.get(`http://localhost:3002/foods/searchByCat/${catId}`, this.state.config)
        .then((response)=>{
            const data=response.data
            if(data[0]!=null){
                this.setState({
                    foods:response.data,
                    catName:'Results for : '+ catName
                })
                console.log(this.state.catName)
            }
            else{
                this.setState({
                    catName :'No results found for : '+ catName,
                    foods:[]
                })   
            }
        })
    }

    handleFood = (foodId) => {
        this.setState({
          modal: !this.state.modal
    
        })
        Axios.get(`http://localhost:3002/foods/${foodId}`, this.state.config)
          .then((response) => {
            const data = response.data;
            this.setState({
              food: data,
              totalprice: data.price
            });
            console.log("data fecth");
          }).catch(error => console.log(error.response));
    }

    addCart(){
        Axios.post(`http://localhost:3002/cart/`,
          {
            food: this.state.food._id,
            totalprice: (this.state.totalprice * this.state.quantity),
            notes: this.state.notes,
            quanity: this.state.quantity
          }, this.state.config)
          .then((response) => {
            console.log(response);
            this.setState({
              modal: !this.state.modal
            })
          }).catch((err) => console.log(err.response));
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    changeBackground(e) {
        e.target.style.background = 'LightSalmon';
        e.target.style.cursor = 'pointer';
        e.target.style.filter= 'invert(100%)';
    }

    changeBackgroundBack(e) {
        e.target.style.background = 'transparent';
        e.target.style.cursor = 'pointer';
        e.target.style.filter= 'sepia(100%)';
    }

    render() {
        return (
            <div>
                <div className="container">
                    <Row>
                        <Col md={12}>
                            <span>What would you like to order ?{' '}
                            {/* <input type="text" name="search" id="search" placeholder="search food..." /> */}
                            </span>
                        </Col>
                    </Row>
                    
                    <Row>
                        {this.state.category.map(catIcon =>
                        <Col>
                            <div key={catIcon._id}>
                                <img alt="catPic" onClick={()=>this.searchFood(catIcon._id, catIcon.category)} 
                                    style={{marginLeft:30}} width='50' height='50' onMouseEnter={this.changeBackground} 
                                    onMouseLeave={this.changeBackgroundBack}
                                    src ={`http://localhost:3002/uploads/${catIcon.catImg}`} id="catImg"/> 
                            </div>
                        </Col>
                        )}
                    </Row>    
                </div>
                <hr/>
                <div className="container">
                    <h3 style={{color:'FireBrick'}}>{this.state.catName?this.state.catName:''}</h3>
                    <Row>
                        {
                        this.state.foods.map((food => 
                            <div className="Col-md-4" id="product">
                                <figure className="card card-product">
                                    <img alt="foodPic" width='200' src={`http://localhost:3002/uploads/${food.foodimage}`}/>
                                    <figcaption class="info-wrap">
                                        <legend className="title">{food.foodname}</legend>
                                        <h6 className="title">Rs. {food.price}</h6>
                                    </figcaption>
                                    <button class="btn btn-primary" onClick={()=>this.handleFood(food._id)}>Add to cart</button>
                                </figure>
                            </div>
                            ))
                        }
                    </Row>
                </div>

                <Modal isOpen={this.state.modal}>
                    <ModalHeader toggle={this.toggle}>Item : {this.state.food.foodname}<br/>
                            Price : Rs.{this.state.food.price}
                    </ModalHeader>
                    <ModalBody>
                        <p>Add notes</p>
                        <textarea id="notes" value={this.state.notes} name="notes" onChange={this.handleChange}></textarea>
                        <hr/>
                        <p>Add quantity</p>
                        <input type="number" pattern="[0-9]*" name="quantity" value={this.state.quantity} onChange={this.handleChange} min="1" max="100" />
                    </ModalBody>
                    <ModalFooter>
                        <Container id="ftr">
                        <button className="btn btn-lg btn-success" id="btnbag" onClick={() => this.addCart(this.state.food._id)}>Add to cart</button>
                        </Container>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
