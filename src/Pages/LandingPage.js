import React from 'react'
import  Navbar  from '../components/Navbar/Navbar';
import Carousel from "../components/Carousel/Carousel";
import Footer from "../components/Footer/Footer";
import Popular from "./Popular";
import Restaurant from "./Restaurant";

export default function LandingPage() {
    return (
        <div>
            <Navbar/>
            <Carousel/>
            <Popular/>
            <Restaurant/>
            <Footer/>
        </div>
    )
}
