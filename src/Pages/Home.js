import React, { Component } from 'react'
import UserNavbar from '../components/Navbar/Navbar';
import Category from './Category';
import Popular from './Popular';
import Brand from './Brand';
import Footer from "../components/Footer/Footer";

export default class Home extends Component {
    render() {
        return (
            <div>
                <UserNavbar />
                <Category />
                <Popular />
                <hr/>
                <Brand/>
                <Footer />
            </div>
        )
    }
}
