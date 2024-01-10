import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './financepage.css';
import sales from '../images/saleswork.gif';
import expenses from '../images/forexpenses.gif';
import AdminNavBar from '../components/adminNavBar';



function financePage() {
  const navigate = useNavigate();

  return (
    <div className="mainDiv">
         <AdminNavBar />
      <div className="container-fluid">
        <div className="row caaardd">
          <div className="col-md-6 div11">
            <div>
            <h1 className="monthlySales">Monthly Sales</h1>

            </div>
            
            <div className="subDiv1">
            <img className="deliimg"
              src={sales}
              alt="Cash on Delivery"
            />
             
            <p>Sustainable income is a key factor in a company's long-term sustainability. It allows a company to plan for the future, make strategic decisions, and adapt to changing market conditions.</p>
             
              <br></br>
             <p>Press below button for check out monthly income</p>
            </div>
            <button
              onClick={() => navigate(`/IncomePage`)}
              className="btn btn-primary mr-2  "
              style={{ width: "200px", height: "7vh" , marginLeft:"-50vh", marginTop:"7vh"}}
            >
              View monthly income
            </button>
          
          </div>
          
          <div className="col-md-1 bg-secondary" style={{ height: "120vh", width: "2px" }}>
            {/* Vertical line with custom height and width */}
          </div>
          
        
          <div className="col-md-5 divv22">
          <div>
            <h1 className="head2" >Monthly expenses</h1>

            </div>
            <div className="subDiv2">
            <img className="deliimg"
              src={expenses}
              alt="Cash on Delivery"
            />
             
            <p> Expenses directly affect a company's profit margin. Higher expenses reduce profitability, while effective cost management can lead to improved margins. Controlling expenses is essential for maximizing profits.</p>
        
              
           
              <p>Press below button for check out monthly expenses</p>
            </div>
            <button
              onClick={() => navigate(`/Expenses`)}
              className="btn btn-primary mr-2  expensesbutt"
              style={{ width: "200px", height: "7vh" , marginLeft:"50vh", marginTop:"7vh" }}
            >
              View monthly expenses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default financePage;
