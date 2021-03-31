import React, { Component } from 'react'
import Axios from 'axios'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import moment from 'moment';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup} from 'reactstrap';
import UserNavbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default class Cart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: [],
      cart: [],
      product: [],
      notes:'',
      viewProduct: [],
      modal: false,
      productName: '',
      totalprice: '',
      totAmt:0,
      updatedprice: 0,
      updatedquanity: '',
      quantity:1,
      show: true,
      max: 5,
      min: 0,
      config: {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      },
      CartId: ''
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  componentDidMount() {
    Axios.get('http://localhost:3002/cart', this.state.config)
      .then((response) => {
        console.log(response.data)
        this.setState({
          cart: response.data,
        })
      })
      .catch((err) => console.log(err.response));
  }

  removeCardList = (CartId) => {
    Axios.delete(`http://localhost:3002/cart/${CartId}`, this.state.config)
      .then((response) => {
        const filteredCartList = this.state.cart.filter((cart) => {
          return cart._id !== CartId
        })
        this.setState({
          visible1: true,
          cart: filteredCartList
        })
      }).catch((err) => console.log(err.response));
  }

  handleChange = (e) => {
    this.setState({
      viewProduct:{...this.state.viewProduct, [e.target.name]: (e.target.validity.valid) ? e.target.value:''}
    })
  }

  handleEdit = (productId) => {
    this.setState({
      modal: !this.state.modal
    })
    Axios.get(`http://localhost:3002/cart/${productId}`, this.state.config)
      .then((response) => {
        const data = response.data;
        this.setState({
          viewProduct: data
        });
        console.log(this.state.viewProduct);
      }).catch(error => console.log(error.response));
  }

  handleUpdate = (cartId) => {
    Axios.put(`http://localhost:3002/cart/${cartId}`,{
      quantity: this.state.viewProduct.quantity,
      totalprice: (this.state.viewProduct.product.price * this.state.viewProduct.quantity),
      notes: this.state.viewProduct.notes,
    }, this.state.config)
      .then((response) => {
        console.log(response);
        this.setState({
          modal: !this.state.modal
        })
      }).catch((err) => console.log(err.response));
      alert("updated successfully")
      window.location.reload();
  }

  handleOrder = () => {
    this.state.cart.forEach(item => {
      Axios.post(`http://localhost:3002/order/`,
      {
        product: item.product._id,
        notes: item.notes,
        dateTime: moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm a'),
        quantity: item.quantity
      }, this.state.config)
      .then((response) => {
        Axios.delete(`http://localhost:3002/cart/${item._id}`, this.state.config)
          .then((response)=>{
            console.log("Deleted Successfully")
            window.location.reload();
          }).catch((err)=>console.log(err.response));          
        console.log(response);
      }).catch((err) => console.log(err.response));
    });
    alert("Ordered successfully")
  }

  submit = () => {
    confirmAlert({
      title: 'Confirm to order',
      message: 'Are you sure to order this items.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.handleOrder()
        },
        {
          label: 'No',
        }
      ]
    });
  };

  render() {
    //Try for loop:
    // for (let i = 0; i < this.state.cart.length; i++) {
    //   this.state.totAmt += this.state.cart[i].totalprice;
    // }

    //OR this method
    // Calculation of the total amount of cart
    this.state.totAmt = this.state.cart.reduce(
      (prevValue, currentValue) => prevValue + currentValue.totalprice,
      0
    );

    return (
      <>
      <UserNavbar/>
      <div class="container-fluid">
      <div id="viewCartDiv">
        <Table hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Note</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.cart.map(cart => {
                return (
                  <tr key={cart._id}>
                  <td>{cart.product.productName}</td>
                  <td>{cart.notes}</td>
                  <td>{cart.quantity}</td>
                  <td>{cart.product.price * cart.quantity}</td>   
                  <td>
                    <button type="button" class="btn btn-primary"
                      onClick={() => this.handleEdit(cart._id)} >Edit</button>
                  </td>
                  <td><button type="button" class="btn btn-danger" onClick={() => this.removeCardList(cart._id)}>Remove</button></td>
                </tr>)
              })
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6" align="right">
                <label>Total Amount: Rs {this.state.totAmt}</label>
              </td>
            </tr>
            <tr>
              <td colSpan="6" align="right">
              <button type="button" class="btn btn-lg btn-success"
              onClick={this.submit} >Order</button>
              </td>
            </tr>
          </tfoot>
        </Table>

        <Modal isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggle}>{this.state.viewProduct.product?this.state.viewProduct.product.productName:""}<br/>
              Rs.{this.state.viewProduct.totalprice}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="notes">Add notes</Label>
              <Input id="notes" 
                type="textarea"
                name="notes"
                placeholder="Type here for more description..." 
                value={this.state.viewProduct.notes} 
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Quantity</Label>
              <Input 
                type="number" 
                pattern="[0-9]*" 
                name="quantity" 
                value={this.state.viewProduct.quantity} 
                onChange={this.handleChange} 
                min="1" 
                max="100" 
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
              <button className="btn btn-lg btn-success" id="btnbag" onClick={() => this.handleUpdate(this.state.viewProduct._id)}>Update</button>
          </ModalFooter>
        </Modal>
      </div>
      </div>
      <Footer className="align-bottom"/>
      </>
    )
  }
}
