import React, { Component } from 'react'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios';
import UserNavbar from "../components/Navbar/Navbar";

export default class ViewOrder extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user : '',
            modal:false,
            food : '',
            quanity : '',
            orderDate:'',
            totprice: '',
            totAmt:0,
            orders: [],
            viewOrder:[],
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
        this.toggle = this.toggle.bind(this);
    }
    
    componentDidMount() {
      Axios.get('http://localhost:3002/order',this.state.config)
        .then((response)=>{
          const data = response.data;
          this.setState({
          orders: data
          });
          console.log(data);
        }).catch((err) => console.log(err.response));
    }

    toggle() {
      this.setState({
        modal: !this.state.modal
      })
    }

    handleViewOrder=(orderId)=>{
      this.setState({
        modal: !this.state.modal,
        orderDate:orderId
      })
      Axios.get(`http://localhost:3002/order/${orderId}`, this.state.config)
        .then((response)=>{
          const data = response.data;
          this.setState({viewOrder:data});
          console.log(this.state.viewOrder);
        }).catch((err)=>console.log(err.response));
    }

    handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
    }
    
    render() {
      this.state.totAmt = this.state.viewOrder.reduce(
        (prevValue, currentValue) => prevValue + currentValue.food.price*currentValue.quanity,0);
        return (
            <div>
            <UserNavbar/>
              <Table hover>
                <thead>
                  <tr class='h4'>
                    <th>Ordered date & time</th>
                    <th>View Order</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  this.state.orders.map(order => {
                    return(
                      <tr key={order._id}>
                          <td>
                          <h5>{order._id}</h5>
                          </td>
                          <td><button type="button" class="btn btn-primary"
                          onClick={() => this.handleViewOrder(order._id)}>View Invoice</button></td>
                      </tr>
                    )})
                  }
                </tbody>
              </Table>
            </div>
        )
    }
}
