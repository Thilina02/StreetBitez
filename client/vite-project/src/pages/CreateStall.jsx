import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateStall.css';
//import { useHistory } from 'react-router-dom';

import backgroundImg from '../stallImages/img2.jpeg';

export default function CreateStall() {

  const { id } = useParams(); 
  const navigate = useNavigate();
  //const history = useHistory();
  const [data, setData] = useState({
    stallName: '',
    type: '',
    amount: '',
    mType: '',
    stallId: '',
    fName: '',
    lName: '',
    phonenumber: '',
    email: '',
    password: '',
    payment: '',
  });

  

  const createStall = async (e) => {
    e.preventDefault();
    const { stallName, type, amount, mType,stallId, fName, lName, phonenumber, email, password, payment } = data;
    try {
      const { data } = await axios.post('./stall/createStall', {
        stallName,
        type,
        amount,
        mType,
        stallId,
        fName,
        lName,
        phonenumber,
        email,
        password,
        payment,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success('Registration Successful. Welcome!');
        
        navigate('/Stalllogin');
      }
    } catch (error) {
      console.log(error);
    }

    toast.success('Payment Successful');
  };

  const handlePayment = () => {
    // Trigger the payment and show the success message
    // Simulating payment success here, you can add your actual payment logic
    setTimeout(() => {
      toast.success('Payment Successful');
    }, 3000); // Simulating a 3-second delay before showing the success message
  };



  return (
    
    <div className="form-container">
      <div className="content form-box">
        <h2>Stall Details</h2>
        <form onSubmit={createStall}>
          <div className="form-group">
            <label htmlFor="stallName">Stall Name</label>
            <input
              type="text"
              name="stallName"
              className="form-control"
              value={data.stallName}
              onChange={(e) => setData({...data, stallName:e.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Cuisine Type</label>
            <select
              name="type"
              className="form-control"
              value={data.type}
              onChange={(e) => setData({...data, type:e.target.value})}
            >
              <option value="">Select Cuisine Type</option>
              <option value="Sri Lankan">Sri Lankan</option>
              <option value="Indian">Indian</option>
              <option value="Japanese">Japanese</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Chinese">Chinese</option>
              <option value="Korean">Korean</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Number of Stall Outlets</label>
            <select
              type="text"
              name="amount"
              className="form-control"
              value={data.amount}
              onChange={(e) => setData({...data, amount:e.target.value})}
            >
              <option value="">Select Amount</option>
              <option value="One Outlet">One Outlet</option>
              <option value="Two to Four">Two to Four Outlets</option>
              <option value="More than Four">More than Four Outlets</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="mType">Merchant Type*</label>
            <input
              type="text"
              name="mType"
              className="form-control"
              value={data.mType}
              onChange={(e) => setData({...data, mType:e.target.value})}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mType">Stall ID</label>
            <input
              type="text"
              name="stallId"
              className="form-control"
              value={data.stallId}
              onChange={(e) => setData({...data, stallId:e.target.value})}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fName">First Name</label>
            <input
              type="text"
              name="fName"
              className="form-control"
              value={data.fName}
              onChange={(e) => setData({...data, fName:e.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lName">Last Name</label>
            <input
              type="text"
              name="lName"
              className="form-control"
              value={data.lName}
              onChange={(e) => setData({...data, lName:e.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phonenumber">Contact Number</label>
            <input
              type="text"
              name="phonenumber"
              className="form-control"
              value={data.phonenumber}
              onChange={(e) => setData({...data, phonenumber:e.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={data.email}
              onChange={(e) => setData({...data, email:e.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={data.password}
              onChange={(e) => setData({...data, password:e.target.value})}
            />
          </div>
          <div className="form-group">
            <p>
              You have to pay 40000 LKR amount to register your stall in our premises.
              <br />
              <button onClick={()=> navigate(`/ReceiptForStall/${id}`)}>Make Payment</button>
            </p>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
    
  );
}
