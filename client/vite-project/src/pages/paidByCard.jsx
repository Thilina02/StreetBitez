import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import pCard from '../images/cartbg4.jpg'
import cash from '../images/68a91e9d5f0b3e787706892300c82ce5.gif'
import './paidBycard.css'; // Import the CSS file here
import NavBar from '../components/NavBar';

function Paidbycard() {
  const navigate = useNavigate();

  return (
    <div className="man">
         <NavBar/>
       <div className="bgh-image"></div>
      <body>
        <div className="cardd">
       
          <div className="imaagbox">
            <img className="deliimg"
              src={cash}
              alt="Cash on Delivery"
            />
          </div>

          <div className="conttt">
            <h2>Paid by card</h2>
            <p>Your payment has successfully made!, keep touching with us</p>
            <button
              onClick={() => navigate(`/PaymentSuccess`)}
              className="btn btn-secondary buttton1"
              style={{ width: "200px", height: "50px" }}
            >
              Ok
            </button>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Paidbycard;
