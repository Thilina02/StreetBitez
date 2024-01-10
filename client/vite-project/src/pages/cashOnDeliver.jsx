import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import cashondeliver from '../images/cashonDeliver.jpg';
import './cashOnDeliver.css'
//import NavBar from '../components/Navbar';
import NavBar from '../components/NavBar';


function CashOnDeliver(){
    const navigate = useNavigate();

    return(
        
        <div className="container">
          
          <NavBar/>
        <div className="row">
            <div className="col-sm delivermanImg">
                <img src={cashondeliver} alt="Food 3"/>
              </div>
              <div className="col-sm contoo">
               <div>
                <h1 className="heaad1" style={{ fontSize: "200%"}}>You can pay in cash to our courier and get receipt from our courier, when you receive the goods at doorstep.</h1>
                <div className="d-flex align-items-center buttoo ">
                <button
                onClick={() => navigate(`/PaymentSuccess`)}
                className="btn btn-secondary"
                style={{ width: "170px", height: "70px" }} >
                Ok
                </button>
                </div>
                </div> 
            </div>
        </div>
    </div>
            
    )
}

export default CashOnDeliver;