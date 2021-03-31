import React from 'react';
import './Footer.css';
import {
  Row,
  Col
} from 'reactstrap';
import { GrFacebook, GrTwitter, GrLinkedin} from "react-icons/gr";
import { SiGmail } from "react-icons/si";


const Footer = (props) => {
  return (
    <div className="footerDiv">
        <div className="container">
            <Row>
                <Col lg={4}>
                    <div align="left" className="p-5">
                        <p className="footerTitle">E-Retail</p>
                        <span className="footerFont">
                        01-1234567<br/>
                        <a align="left" href="/contact">contact@eretail.com</a><br/>
                        New Baneshwor, KTM<br/>
                        </span>   
                    </div>
                </Col>
                <Col lg={4}>
                    <div align="left" className="p-5">
                        <p className="footerTitle">ABOUT E-retail</p>
                        <span className="footerFont">
                        <p> E-retail is the project developed for academic course module (Dissertation).</p>
                        </span> 
                    </div>
                </Col>
                <Col lg={4}>
                    <div align="left" className="p-5">
                        <p className="footerTitle">QUICK LINKS</p>
                        <span className="footerFont" >
                            <a href="/">HOME</a><hr/>
                            <a href="/viewCart">My Cart</a><hr/>
                            <a href="/viewOrder">My Orders</a><hr/>
                            <a href="/about">ABOUT US</a><hr/>
                            <a href="/contact">CONTACT</a>
                        </span>
                    </div>
                </Col>
                <Col align="left" className="footerFont pl-5">
                <p> <a href="/">© E-retail</a> | Site by
                <a href="#"> AMIT PRADHAN</a>	</p>
                </Col>
                <Col align="right">
                <a className="m-1" href="https://www.facebook.com/"><GrFacebook/></a>
                <a className="m-1" href="https://twitter.com/"><GrTwitter/></a>
                <a className="m-1" href="https://www.linkedin.com/"><GrLinkedin/></a>
                <a className="m-1" href="https://www.gmail.com/"><SiGmail/></a>
                </Col>
            </Row>
        </div>
    </div>
  )
}

export default Footer;