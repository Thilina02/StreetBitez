import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-hot-toast'
import boximage from '../images/driver7.jpg'
import "./driverRegister.css"; // Import the CSS file


function DriverRegister() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    email: '',
    mobile: '',
    nic: '',
    province: '',
    gender: '',
    password: '',
  });

  const registerDriver = async (e) => {
    e.preventDefault();

    const {
          username,
          email,
          mobile,
          nic,
          province,
          gender,
          password
    } =data

    // Password validation
    //if (password.length < 6) {
      //alert("Password must be at least 6 characters long.");
      ///return;
    //}

    // Mobile number validation
    //const mobilePattern = /^\d{10}$/; // Assumes a 10-digit format, adjust as needed

    //if (!mobile.match(mobilePattern)) {
      //alert("Invalid mobile number format. Please enter a 10-digit number.");
      //return;

     try {
      const {data} = await axios.post('http://localhost:8000/drivers/addDriver', {
          username,
          email,
          mobile,
          nic,
          province,
          gender,
          password
      });

      if(data.error) {
        toast.error(data.error)
      }else {
        setData, ({})
        toast.success('Registration Successful, Welcome!!')
        navigate('/driver-login')
      }
  } catch (error) {
    console.log(error)
    }
};


return (
  
<div className="form-register-container">
<img src={boximage} className="driver-register-image" />
  <div className="content form-box">
    <h2>Register with Us!!</h2>
    <form onSubmit={registerDriver}>
      <div className="form-group">
        <label htmlFor="username"><strong>Username</strong></label>
        <input
          type="text"
          placeholder="Enter Name"
          autoComplete="off"
          name="username"
          id="username"
          className="form-control "
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email"><strong>Email</strong></label>
        <input
          type="email"
          placeholder="Enter Email"
          autoComplete="off"
          name="email"
          id="email"
          className="form-control"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobile"><strong>Mobile</strong></label>
        <input
          type="tel"
          placeholder="Enter Mobile Number"
          autoComplete="off"
          name="mobile"
          id="mobile"
          className="form-control"
          value={data.mobile}
          onChange={(e) => setData({ ...data, mobile: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="nic"><strong>NIC</strong></label>
        <input
          type="text"
          placeholder="Enter NIC"
          autoComplete="off"
          name="nic"
          id="nic"
          className="form-control"
          value={data.nic}
          onChange={(e) => setData({ ...data, nic: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="province"><strong>Province</strong></label>
        <select
          id="province"
          name="province"
          className="form-control"
          value={data.province}
          onChange={(e) => setData({ ...data, province: e.target.value })}
        >
          <option value="">Select a Province</option>
          <option value="Western Province">Western Province</option>
          <option value="Central Province">Central Province</option>
          <option value="Southern Province">Southern Province</option>
          <option value="Northern Province">Northern Province</option>
          <option value="Eastern  Province">Eastern  Province</option>
          <option value="North Central Province">North Central Province</option>
          <option value="North Western Province">North Western Province</option>
          <option value="Uva Province">Uva Province</option>
          <option value="Sabaragamuwa Province">Sabaragamuwa Province</option>
        </select>
      </div>
      <div className="form-group">
        <label><strong>Gender</strong></label><br />
        <div className="form-check form-check-inline">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            className="form-check-input"
            checked={data.gender === "male"}
            onChange={(e) => setData({ ...data, gender: e.target.value })}
          />
          <label className="form-check-label" htmlFor="male">Male</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            className="form-check-input"
            checked={data.gender === "female"}
            onChange={(e) => setData({ ...data, gender: e.target.value })}
          />
          <label className="form-check-label" htmlFor="female">Female</label>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="password"><strong>Password</strong></label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          id="password"
          className="form-control"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>
      <button type="submit" className="btn btn-success btn-block">
        Register 
      </button>
    </form>
    <p className="login-link">
            Already a user? <Link to="/driver-login">Login here</Link>
          </p>
  </div>
</div>

      );
      
}

export default DriverRegister;