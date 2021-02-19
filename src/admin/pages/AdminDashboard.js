import React, { Component } from 'react'
import AdminNavbar from '../Navbar/adminNavbar';
import ListBrands from './ListBrands';
import ListProducts from './ListProducts';

export default class AdminDashboard extends Component {
    render() {
        return (
            <div>
                <AdminNavbar />
                <h2>List of Brands</h2>
                <ListBrands/>
                <h2>List of Products</h2>
                <ListProducts/>
                <hr></hr>
            </div>
        )
    }
}
