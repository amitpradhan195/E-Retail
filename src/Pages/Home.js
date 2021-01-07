import React, { Component } from 'react'
import UserNavbar from '../components/Navbar/Navbar';
// import Category from './Category';
// import Poppular from './Poppular';
// import Restaurant from './Restuarant';
import Footer from "../components/Footer/Footer";

export default class Home extends Component {
    render() {
        return (
            <div>
                <UserNavbar />
                {/* <Category /> */}
                {/* <Poppular /> */}
                <hr/>
                {/* <Restaurant/> */}
                <Footer />
            </div>
        )
    }
}
