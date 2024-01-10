import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './adminFinance.css'
import adminsSvg from '../images/undraw_experience_design_re_dmqq.svg'
//import NavBar from '../components/Navbar';
import AdminNavBar from "../components/adminNavBar";


function CashOnDeliver(){
    const navigate = useNavigate();

    return(
        
       <div className="imgSvg">
        <AdminNavBar />
        <p className="adminP">Choose the desired page</p>
         <img src={adminsSvg}></img>
         <button
                onClick={() => navigate(`/ViewSuccessPayments`)}
                className="btn btn-primary mr-2 succpay"
                style={{ width: "170px", height: "70px" }} >
               Successfull payments
                </button>

                <button
                onClick={() => navigate(`/FinancePage`)}
                className="btn btn-primary mr-2 expenseAndInc"
                style={{ width: "170px", height: "70px" }} >
                View expenses and sales
                </button>
        </div>
            
    )
}

export default CashOnDeliver;