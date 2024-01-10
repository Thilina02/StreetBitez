import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom"; // Import useParams
import "bootstrap/dist/css/bootstrap.min.css";
import paymetMethod from '../images/methodpayment.gif';
import "./PaymentMeth.css";
import NavBar from '../components/NavBar';

function PaymentMeth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); 
  return (
    <div className="container mt-5 parent allpay">
     
   
      <div>
      <NavBar/>
      <h3 className="phead">Payment method</h3>
      <div className="row mt-3 depoAndUp">
        <p>"deposit money and upload a slip" process is a fundamental part of financial transactions, adding a layer of trust and accountability to financial dealings, both in personal and business contexts. It ensures that there is clear documentation of payments, which can be beneficial for financial tracking and dispute resolution</p>
        <button
          onClick={() => navigate(`/CardDetails/${id}`)}
          className="btn btn-primary mr-2 depobttn1"
          style={{ width: "200px", height: "70px", margin:"auto" }}
        >
          Credit/Debit card
        </button>
      </div>

     
      <div className="col-md-6 cashOndeli">
        <p style={{margin: "auto"}}>Cash on Delivery is a payment method that prioritizes customer convenience, security, and trust. It's particularly useful in areas where online payment infrastructure is less developed, and it allows buyers to make payments for their orders when they are physically delivered.This minimizes the risk of fraud, as customers can verify the quality and condition of the products before releasing payment.    </p>
        <button
          onClick={() => navigate(`/CashOnDeliver`)}
          className="btn btn-primary mr-2 cashbttn2"
          style={{ width: "200px", height: "70px", margin:"auto" }}
        >
          Cash on delivery
        </button>
      </div>
      </div>
      
      <div className="col-md-6 ">
      <img src={paymetMethod} className="methodImg" alt="Food 3"/>
      </div>
    </div>
  );
}

export default PaymentMeth;
