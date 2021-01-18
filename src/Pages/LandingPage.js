import React, { useEffect } from 'react'
import  Navbar  from '../components/Navbar/Navbar';
import Carousel from "../components/Carousel/Carousel";
import Footer from "../components/Footer/Footer";
import Popular from "./Popular";
import Restaurant from "./Restaurant";
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
    },[])

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
