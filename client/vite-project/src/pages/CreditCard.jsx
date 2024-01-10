import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import creditcard from "../images/cardpayment.svg";
import "./CardDet.css";
import NavBar from '../components/NavBar';
function CardDetails() {
  const [Cnum, setCnum] = useState("");
  const [Cvv, setCvv] = useState("");
  const [Ctype, setCtype] = useState("");
  const [Expiration, setExpiration] = useState("");
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [stall, setStall] = useState(null);

  console.log(id)

  const navigate = useNavigate();

  // update order
  const handleSubmitt = (e) => {
    e.preventDefault();
    if (!Cvv || Cvv.length !== 3) {
      // Check if CVV is missing or not 3 characters long
     alert("Cvv should be 3 characters!");
    }
    else if (order && order.name) {
      alert("Payment success");
      updateOrderSuccess(
        `http://localhost:8000/SuccessOrder/OrderSuccess/${order._id}`
      );
      navigate("/Paidbycard"); // Replace "/success" with your desired route
    }/*
    else if (order ) {
      updateOrderSuccess(
        `http://localhost:8000/SuccessOrder/OrderSuccess/${order._id}`
      );
      navigate("/Paidbycard"); // Replace "/success" with your desired route
    }*/
  };

  // update stall payment status to success
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Cvv || Cvv.length !== 3) {
      // Check if CVV is missing or not 3 characters long
      alert("Cvv should be 3 characters!");
    }
    else if (stall) {
      updateStallPaymentSuccess(
        `http://localhost:8000/SuccessStall/stallPaymentSuccess/${stall._id}`
      );
      navigate("/Paidbycard"); // Replace "/success" with your desired route
    }
  };

  // update stall payment success
  const updateStallPaymentSuccess = (url) => {
    axios
      .put(url, { status: "success" })
      .then((response) => {
        if (response.status === 200) {
          console.log("stall data updated successfully.");
          navigate("/success");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateOrderSuccess = (url) => {
    axios
      .put(url, { status: "success" })
      .then((response) => {
        if (response.status === 200) {
          console.log("Order data updated successfully.");
          navigate("/success"); // Replace "/success" with your desired route
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    // Function to fetch order data
    const fetchStallByID = async (orderId) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/orderss/${orderId}`
        );
        setOrder(response.data.order);
      } catch (error) {
        console.error(error);
      }
    };

    // Check order collection
    fetchStallByID(id);
  }, [id]);

  useEffect(() => {
    console.log("retrieved stall ==>", stall)
  }, [stall])

  useEffect(() => {
    console.log("retrieved orders ==>", order)
  }, [order])

  // get stall data by ID
  useEffect(() => {
    const fetchStallById = async (stallId) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/stall/fetchStall/${stallId}`
        );
        console.log(response)
        setStall(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchStallById(id);
    }
  }, [id]);

  return (
    <div className="container">
      <div className="row">
      <NavBar/>
        <div className="col-sm">
          <h1 className="cHead">Card details</h1>
          <img src={creditcard} style={{width: "50vh", marginLeft: "-100vh"}} alt="Food 3" />
        </div>
        

        <form>
        <div className="cardDetaaaa">
          <div className="mb-3">
            <label htmlFor="cNum">
              <strong>Card number</strong>
            </label>
            <input
              type="text"
              id="cNum"
              placeholder="Enter card number"
              className="form-control rounded-0"
              onChange={(e) => setCnum(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="cvv">
              <strong>CVV</strong>
            </label>
            <input
              type="text"
              id="cvv"
              placeholder="Enter CVV"
              className="form-control rounded-0"
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Ctype">
              <strong>Card type (Visa/Mastercard)</strong>
            </label>
            <input
              type="text"
              id="Ctype"
              placeholder="Enter card type"
              autoComplete="off"
              className="form-control rounded-0"
              onChange={(e) => setCtype(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Expiration">
              <strong>Expiration (MM/YY)</strong>
            </label>
            <input
              type="date"
              id="Expiration"
              placeholder="Enter expiration"
              autoComplete="off"
              className="form-control rounded-0"
              onChange={(e) => setExpiration(e.target.value)}
              required
            />

          </div>

          
          </div>
      
           
        </form>
        

  

        {order !== null && (
          <div className="text-start mb-2 fetchedTable">
            <div>
              {order && order.name && (
                <div>
                  <h2>Order Details</h2>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{order.name}</td>
                        <td>{order.quantity}</td>
                        <td>{order.price}</td>
                        <td>{order.date}</td>
                        <td>{order.status}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <button
              type="button"
              className="btn-primary insertButt"
              onClick={ handleSubmitt}
            >
              Done
            </button>
          </div>
        )}

        {/* stall data */}
        {stall !== null && (
          <div className="text-start mb-2 fetchedTable">
            <div>
              {stall && (
                <div>
                 {/* <h2>Stall Details</h2>*/}
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>payment status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{stall.stallId}</td>
                        <td>{stall.fName}</td>
                        <td>{stall.lName}</td>
                        <td>{stall.stallName}</td>
                        <td>{stall.type}</td>
                        <td>{stall.amount}</td>
                        <td>{stall.mType}</td>
                        <td>{stall.phonenumber}</td>
                        <td>{stall.email}</td>
                        <td>{stall.status}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <button
              type="button"
              className="btn-primary insertButt"
              onClick={handleSubmit }
            >
              Done
            </button>
           
          </div>
        )}
      </div>
    </div>
  );
}

export default CardDetails;
