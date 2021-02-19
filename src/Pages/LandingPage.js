import React, { useEffect } from 'react'
import  Navbar  from '../components/Navbar/Navbar';
import Carousel from "../components/Carousel/Carousel";
import Footer from "../components/Footer/Footer";
import Category from './Category';
import Popular from "./Popular";
import Brand from "./Brand";
import { useHistory } from "react-router-dom";

export default function LandingPage() {
    let history = useHistory();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token!=null){
            let role = localStorage.getItem("role");
            if(role==="admin"){
                history.push("/adminDashboard");
            }
            else{
                history.push("/home");
            }
        }
        else{
            history.push("/")
        }
    },[history])

    return (
        <div>
            <Navbar/>
            <Carousel/>
            <Category />
            <Popular/>
            <Brand/>
            <Footer/>
        </div>
    )
}
