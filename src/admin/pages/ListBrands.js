import React, { Component } from 'react'
import { Table, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';
import Axios from 'axios'


export default class ListBrands extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
                 _id: '',
                 brand_name: '',
                 brand_image:'',
                 popular: [],
                 brand: [],
                 modal : false,
                 isupdated: false,
                 config: {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                },
                selectedFile: null,
                imgPreview:null,
          }
          this.toggle = this.toggle.bind(this);
      }

  toggle() {
    this.setState({
    modal: !this.state.modal
    })
  }
             
  componentDidMount() {
    Axios.get('http://localhost:3002/brands',this.state.config)
    .then((response)=>{
      const data = response.data;
      this.setState({popular:  data});
      this.setState({brand: data});        
      console.log("data fecth");       
    }).catch(error => console.log(error.response));
  }

  handleFileSelect = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
      imgPreview: URL.createObjectURL(e.target.files[0])
    })
  }     
       
  handleChange = (e)  =>{
    this.setState({
      [e.target.name]: e.target.value 
    })
  }

  deleteBrand(brandId){
    Axios.delete(`http://localhost:3002/brands/${brandId}`, this.state.config)
    .then((response) => {
      console.log("Deleting Brand")
    })
  }

  handleEdit = (brandId) => {
    this.setState({
      modal: !this.state.modal
    });
    Axios.get(`http://localhost:3002/brands/${brandId}`,this.state.config)
    .then((response)=>{
      const data = response.data;
      this.setState({
        brand: data,
        imgPreview:`http://localhost:3002/uploads/${data.brand_image}`
      });         
    }).catch(error => console.log(error.response)); 
  }

  handleupdate = (e) =>{
    this.setState({
      brand: { ...this.state.brand, [e.target.name]: e.target.value }
    })
  }
     
  updateBrand = (brandId) => {
    const data = new FormData()
    data.append('imageFile', this.state.selectedFile)
    Axios.post('http://localhost:3002/uploads', data, this.state.config)
    .then((response) => {
      this.setState({
        brand_image: response.data.filename
      })
      console.log(response)
      Axios.put(`http://localhost:3002/brands/${brandId}`, 
      { 
        brand_name:this.state.brand.brand_name,
        brand_image:this.state.brand_image 
      },this.state.config)
        .then((response) => {
          // alert("Brand updated successfully")
            window.location.reload();
          console.log(response.data)
        })
        .catch((err) => console.log(err.response))
    }).catch((err) => console.log(err.response))
    }    
  
    render() {
        return (
            <Table hover>
            <thead>
              <tr>
                <th>Brand Name</th>
                <th>Brand Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
                {
                  this.state.popular.map(pop => 
                  <tr key={pop._id}>
                    <td>{pop.brand_name}</td>
                    <td><img alt="img" src={`http://localhost:3002/uploads/${pop.brand_image}`} style={{height: "50px",width:"50px"}}/></td>
                    <td><a className="btn btn-success" onClick={() => this.handleEdit(pop._id)}>
                                        Edit</a></td>
                    <td><a onClick={() => this.deleteBrand(pop._id)} className="btn btn-danger" href="">Delete</a></td>
                  </tr>
                  )
                }
    
        <Modal isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggle}><legend>Update</legend></ModalHeader>
          <ModalBody>
                <legend><h3>Update Brand</h3></legend>
                <div className="form-group">
                    <label> Brand Name</label> 
                      <input type="text" name="brand_name" className="form-control"
                        value ={this.state.brand.brand_name} onChange={this.handleupdate}/> 
                  </div>
                  <img className='img-thumbnail' width='200'
                  src={this.state.imgPreview} alt="brandImg" />
                  <Input type='file' name='brand_image' id='brand_image'
                    onChange={this.handleFileSelect}/>
                  <button className="btn btn-primary btn-block" onClick={() => this.updateBrand(this.state.brand._id)}>Update</button>   
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
      </tbody>
    </Table>
    )
  }
}
