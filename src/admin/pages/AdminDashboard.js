import React, { Component } from 'react'
import AdminNavbar from '../Navbar/adminNavbar';
import ListRestaurants from './ListResturant';
import ListFoods from './ListFoods';

export default class AdminDashboard extends Component {
    render() {
        return (
            <div>
                <AdminNavbar />
                <h2>List of Restaurants</h2>
                <ListRestaurants/>
                <h2>List of Foods</h2>
                {/* <ListFoods/> */}
                <hr></hr>
            </div>
        )
    }
}
