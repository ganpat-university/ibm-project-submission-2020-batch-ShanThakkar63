import React, { Component } from "react";

import UserService from "../services/user.service";

import backImage from './images/landing-img.png';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }


    render() {

        return (
            <div className="container-fluid">
                <div className="row landing-backdrop">
                    <div className="col-12 col-sm-4">
                        <div className="d-flex align-content-center flex-wrap text-light vh-100 ml-4">
                            <span>
                                <h3 className="display-4">
                                    Inventory Management System
                                </h3>
                                <blockquote className="blockquote">
                                    <p>
                                     Institute Of Computer Technology
                                     <p>   Ganpat University</p>
                                    </p>
                                </blockquote>
                                <hr className="bg-secondary mb-4 mt-0 d-inline-block mx-auto" style={{ 'width': '150px', 'height': '3px' }}></hr>
                                <div className="row ml-1">
                                    <a href={"/login"}>
                                        <button
                                            type="button"
                                            className="btn btn-light btn-lg">
                                            Login
                                     <i className="fas fa-sign-in-alt fa-fw"></i>
                                        </button>
                                    </a>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="col-8 d-none d-sm-block"
                        style={{
                            backgroundImage: `url(${backImage})`,
                            backgroundRepeat: 'no-repeat',
                            height: '100vh',
                            width: 'auto',
                            backgroundSize: 'cover'
                        }}>
                    </div>
                </div>


                 <div className="row align-items-center">
                    <div className="col-12 mt-5">
                        <div className="col-12 p-3 text-center text-info">
                            <h2 className="text-center display-4">The Online Inventory Management System</h2>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="container mb-5">
                            <div className="col-12">
                                <p className="text-center" style={{ fontSize: "18px" }}>
                                Streamline your business operations with our cutting-edge Inventory Management System. From real-time stock tracking to seamless order processing, our solution ensures efficient management of your inventory. Enhance transparency, minimize errors, and optimize your supply chain with our user-friendly platform.
                                </p>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-sm-3 p-3 text-center text-info">
                                <div className="" style={{ 'fontSize': '0.6rem' }}>
                                    <i className="fas fa-microchip fa-10x m-3"></i>
                                </div>
                                <h4 className="text-center">Request Components</h4>
                            </div>
                            <div className="col-sm-3 p-3 text-center text-info">
                                <div className="" style={{ 'fontSize': '0.6rem' }}>
                                    <i className="fas fa-cogs fa-10x m-3"></i>
                                </div>
                                <h4 className="text-center">Request Services</h4>
                            </div>
                            <div className="col-sm-3 p-3 text-center text-info">
                                <div className="" style={{ 'fontSize': '0.6rem' }}>
                                    <i className="fas fa-calendar-day fa-10x m-3"></i>
                                </div>
                                <h4 className="text-center">Track Deadlines</h4>
                            </div>
                            <div className="col-sm-3 p-3 text-center text-info">
                                <div className="" style={{ 'fontSize': '0.6rem' }}>
                                    <i className="fas fa-info-circle fa-10x m-3"></i>
                                </div>
                                <h4 className="text-center">Get Latest Updates</h4>
                            </div>
                        </div>
                    </div>
                </div>

                  <footer className="pt-4 row home-footer">
                    <div className="row container-fluid text-center text-light text-md-left mx-5">
                        <div className="col-12 col-md-4 mb-md-0 mb-3">
                            <h5>Contact Us</h5>
                            <hr className="bg-secondary mb-4 mt-0 d-inline-block mx-auto" style={{ 'width': '60px' }}></hr>
                            <ul className="list-unstyled">
                                <a href="tel:+94812393240" className="text-light text-decoration-none">
                                    <p><i className="fas fa-phone fa-fw"></i> Mob. 8347978739</p>
                                </a>
                                <a href="mailto:shanthakkar20@gnu.ac.in" className="text-light text-decoration-none">
                                    <p><i className="fas fa-envelope fa-fw"></i> shanthakkar20@gnu.ac.in</p>
                                </a>
                                <p><i className="fas fa-map-marker-alt fa-fw"></i> Institute Of Computer Technology,<br />
                                    <span className="ml-4">Ganpat University,</span><br />
                                    <span className="ml-4">Sola 380060, Gujarat.</span></p>
                            </ul>
                        </div>
                        <div className="col-12 col-md-4 mb-md-0 mb-3">
                            <h5>Useful Links</h5>
                            <hr className="bg-secondary mb-4 mt-0 d-inline-block mx-auto" style={{ 'width': '60px' }}></hr>
                            <ul className="list-unstyled">
                                <blockquote className="blockquote">
                                    <li className="pb-2">
                                        <a href="https://ict.guni.ac.in/" target="blank" className="text-secondary">
                                            <h6>
                                                <i className="far fa-building fa-fw mr-1"></i>
                                                    College Website
                                                </h6>
                                        </a>
                                    </li>
                                    <li className="pb-2">
                                        <a href="https://www.ganpatuniversity.ac.in/" target="blank" className="text-secondary">
                                            <h6>
                                                <i className="fas fa-globe fa-fw mr-1"></i>
                                                    University Website
                                            </h6>
                                        </a>
                                    </li>
                                    <li className="pb-2">
                                        <a href="https://www.ict.gnu.ac.in/sites/" target="blank" className="text-secondary">
                                            <h6>
                                                <i className="fas fa-users fa-fw mr-1"></i>
                                                     student Portal
                                            </h6>
                                        </a>
                                    </li>
                                </blockquote>
                            </ul>
                        </div>
                        <div className="col-12 col-md-4 mb-md-0">
                            <h5>Visit Us</h5>
                            <hr className="bg-secondary mb-4 mt-0 d-inline-block mx-auto" style={{ 'width': '60px' }}></hr>
                            <div className="m-2">
                                
                                <iframe title="location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.580323523702!2d72.52364687500518!3d23.07584281433875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e834be1083d4b%3A0xad88fa1e16e789e4!2sICT%20Ganpat%20university!5e0!3m2!1sen!2sin!4v1705609834562!5m2!1sen!2sin" width="300" height="200" frameBorder="0" style={{ 'border': '0' }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>



            /*<div className="container-fluid" style={{height:'100vh', width:'100vw'}}>

                

                {/*<div className="row" >
                    <div >
                        <div style={{height:'100%', width:'100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                            
                            <div className="row" style={{backgroundPositionY: 'center'}}>
                                <h3 className="display-4" style={{color:'white'}}>Inventory Management System</h3> 
                            </div>

                {/*<div className="row justify-content-md-center"> 
                    <div className="jumbotron mt-5"  > 
                        
                        {/*}                     
                            <p> 
                                Department of Computer Engineering
                            </p>
                            <p> 
                                Faculty of Engineering, University of Peradeniya 
                            </p>
                            <hr className="my-4" />
                            <p className="lead">
                                Some ABOUT content should be added
                            </p>

                            {/* dynamic content from server 
                            <p>{this.state.content}</p>
                        
                        {/* <p className="lead">
                            <a className="btn btn-primary btn-lg" href="/login" role="button">
                                Login
                             </a>
                        </p>  
                        </div>
                </div>
            </div> */

        );
    }
}