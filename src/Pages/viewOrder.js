import React, { Component } from 'react'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios';
import UserNavbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default class ViewOrder extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user : '',
            modal:false,
            product : '',
            quantity : '',
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
        (prevValue, currentValue) => prevValue + currentValue.product.price*currentValue.quantity,0);
        return (
          <>
            <div>
            <UserNavbar/>
              <Table hover className="mb-5">
                <thead>
                  <tr className='h4'>
                    <th>Ordered date & time</th>
                    <th>View Order</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  this.state.orders.map((order, index, arr) => {
                    return (
                      <tr key={order._id}>
                          <td>
                          <h5>{order._id}</h5>
                          </td>
                          <td><button type="button" className="btn btn-primary"
                          onClick={() => this.handleViewOrder(order._id)}>View Invoice</button></td>
                      </tr>
                    )})
                  }
                </tbody>
              </Table>

              <Modal size="md" isOpen={this.state.modal} modalTransition={{ timeout: 200 }} backdropTransition={{ timeout: 300 }}
                toggle={this.toggle}>
                <ModalHeader toggle={this.toggle} style={{color:'#1f618d', backgroundColor:'#F4F6F6'}}>
                  <h3>E-Retail</h3>
                </ModalHeader>
                <ModalBody className="printDiv" style={{backgroundColor:'#F8F9F9'}}>
                  <h3 className="billHeader">E-Retail</h3>
                  <h5>Ordered Date : <span className="h6"> {this.state.orderDate} </span></h5>
                  <Table>
                    <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total Price</th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.viewOrder.map(listItem=>{
                          return(
                            <tr key={listItem._id}>
                              <td>{listItem.product.productName}</td>
                              <td>{listItem.quantity}</td>
                              <td>{listItem.product.price}</td>
                              <td>{listItem.product.price*listItem.quantity}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="4" align="right">
                          <h4 style={{color:'#34495E'}}>Total Amount: Rs {this.state.totAmt}</h4>
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </ModalBody>
                <ModalFooter style={{backgroundColor:'#F4F6F6'}}>
                  <Button color="primary" onClick={()=>window.print()}>Print Bill</Button>
                  <Button color="secondary" onClick={this.toggle}>Close</Button>
                </ModalFooter>
              </Modal>
            </div>
            <Footer className="align-bottom"/>
          </>
        )
    }
}
