import { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";
import './driverLogin.css';
import boximage from '../images/driver13.jpg'


function DriverLogin(){
    const navigate = useNavigate();
   
  

    return (
      
        <div className="driver-admin-home-content">
            <img src={boximage} width="100%" height="90%" />
            <h1>View registered drivers</h1>
            <Link to="/driver-admin">
          <button className="btn btn-primary mt-3">View drivers</button>
        </Link>
         
    </div>
 )
}

export default DriverLogin;