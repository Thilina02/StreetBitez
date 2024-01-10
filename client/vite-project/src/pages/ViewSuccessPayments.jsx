import React, { useEffect, useState } from "react";
import axios from "axios";
import './ViewSuccessPayment.css';
import { Link, useNavigate } from "react-router-dom";
import AdminNavBar from "../components/adminNavBar";
const ViewSuccessPayments = () => {
    const [order, setOrder] = useState(null);
    const [stall, setStall] = useState(null);
    const [orderSearch, setOrderSearch] = useState('');
    const [stallSearch, setStallSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllorder = async () => {
          try {
            const response = await axios.get("http://localhost:8000/orders");
            console.log(response)
            setOrder(response.data.orders);
            setIsLoading(false);
          } catch (error) {
            console.error(error);
            setIsLoading(false);
          }
        };
    
        fetchAllorder();
      }, []);
    
        // Fetch stalls
        useEffect(() => {
            const fetchAllstall = async () => {
              try {
                const response = await axios.get("http://localhost:8000/stall/getAllStall");
                setStall(response.data);
                setIsLoading(false);
              } catch (error) {
                console.error(error);
                setIsLoading(false);
              }
            };
        
            fetchAllstall();
          }, []);
    const filteredOrders = order && order.filter(orderItem =>
        orderItem.status === "success" &&
        orderItem.name.toLowerCase().includes(orderSearch.toLowerCase())
    );

    const filteredStalls = stall && stall.filter(stallItem =>
        stallItem.status === "success" &&
        stallItem.stallId.toString().includes(stallSearch)
    );

    return (
        <div>
            <div className="mmm">
            <AdminNavBar />
                
                <h1 className="ViewHead">Successful Stall Payments</h1>
                <input
                    type="text"
                    placeholder="Search Stalls by ID"
                    value={stallSearch}
                    onChange={(e) => setStallSearch(e.target.value)}
                    style={{width:"40vh", marginLeft: "80vh", marginBottom:"10vh"}}
                />
                <table className="table table-striped table-bordered custom-table successStall">
                    <thead>
                        <tr>
                            <th>Stall ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Stall Name</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Membership Type</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStalls && filteredStalls.map((stallItem, index) => (
                            <tr key={index}>
                                <td>{stallItem.stallId}</td>
                                <td>{stallItem.fName}</td>
                                <td>{stallItem.lName}</td>
                                <td>{stallItem.stallName}</td>
                                <td>{stallItem.type}</td>
                                <td>{stallItem.amount}</td>
                                <td>{stallItem.mType}</td>
                                <td>{stallItem.phonenumber}</td>
                                <td>{stallItem.email}</td>
                                <td>{stallItem.payment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
              onClick={() => navigate(`/AdminFinance`)}
              className="btn btn-primary mr-2  ViewSucc"
              style={{ width: "200px", height: "50px" }}
            >
             Back to dashbord
            </button>
            </div>
        </div>
    );
};

export default ViewSuccessPayments;
