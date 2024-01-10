import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-hot-toast';
import AdminNavBar from '../components/adminNavBar';

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    email: '',
    idNumber: '',
    phoneNumber: '',
    team: '',
    password: '',
    cPassword: '',
  });

  const [emailValid, setEmailValid] = useState(true);
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const [idNumberValid, setIdNumberValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);



 

  const createEmployee = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (data.password !== data.cPassword) {
      setPasswordMatch(false);
      return;
    }

    // Check if phone number is valid
    if (data.phoneNumber.length !== 10 || !/^[0-9]+$/.test(data.phoneNumber)) {
      setPhoneNumberValid(false);
      return;
    }

    // Check if ID number is valid
    if (data.idNumber.length !== 10 && data.idNumber.length !== 12) {
      setIdNumberValid(false);
      return;
    }

    // Check if email is valid
    if (!validateEmail(data.email)) {
      setEmailValid(false);
      return;
    }

    // Create a FormData object
    const { name, email, idNumber, phoneNumber, team, password, cPassword } = data;
    try {
      const data = await axios.post('/employee/createEmployee', { name, email, idNumber, phoneNumber, team, password, cPassword  });
      if(data.error) {
       toast.error(data.error)
      }else{
       setData({})
       toast.success('Login Successful.Welcome')
       navigate('/getEmployee'); // Navigate to the employee list page
      }
      
   } catch (error) {
       console.error(error);
   }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="form-container">
  <div className="bgr-image"></div>
  <div className="content form-box">
    <br />
    <h2>Create Employee</h2>
    <form onSubmit={createEmployee} className="was-validated">
      <div className="mb-2">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter Name"
          name="name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          required
        />
        <div className="valid-feedback">Valid.</div>
        <div className="invalid-feedback">Please fill out this field.</div>
      </div>

      <div className="mb-2">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className={`form-control ${!emailValid ? 'is-invalid' : ''}`}
          id="email"
          placeholder="Enter Email"
          name="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />
        {!emailValid && <div className="invalid-feedback">Invalid email address</div>}
      </div>

      <div className="mb-2">
        <label htmlFor="idNumber" className="form-label">
          ID Number:
        </label>
        <input
          type="text"
          className={`form-control ${!idNumberValid ? 'is-invalid' : ''}`}
          id="idNumber"
          placeholder="Enter ID Number"
          name="idNumber"
          value={data.idNumber}
          onChange={(e) => setData({ ...data, idNumber: e.target.value })}
          required
        />
        {!idNumberValid && <div className="invalid-feedback">ID number must have 10 or 12 characters</div>}
      </div>

      <div className="mb-2">
        <label htmlFor="phoneNumber" className="form-label">
          Phone Number:
        </label>
        <input
          type="number"
          className={`form-control ${!phoneNumberValid ? 'is-invalid' : ''}`}
          id="phoneNumber"
          placeholder="Enter Phone Number"
          name="phoneNumber"
          value={data.phoneNumber}
          onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
          required
        />
        {!phoneNumberValid && <div className="invalid-feedback">Phone number must have 10 digits</div>}
      </div>

      <div className="mb-2">
        <label htmlFor="team" className="form-label">
          Team:
        </label>
        <select
          name="team"
          className="form-control"
          id="team"
          value={data.team}
          onChange={(e) => setData({ ...data, team: e.target.value })}
          required
        >
          <option value="teamA">Team A</option>
          <option value="teamB">Team B</option>
          <option value="teamC">Team C</option>
          <option value="teamD">Team D</option>
          <option value="teamE">Team E</option>
        </select>
        <div className="valid-feedback">Valid.</div>
        <div className="invalid-feedback">Please select a team.</div>
      </div>

      <div className="mb-2">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter Password"
          name="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        />
        <div className="valid-feedback">Valid.</div>
        <div className="invalid-feedback">Please fill out this field.</div>
      </div>

      <div className="mb-2">
        <label htmlFor="cPassword" className="form-label">
          Confirm Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="cPassword"
          placeholder="Confirm Password"
          name="cPassword"
          value={data.cPassword}
          onChange={(e) => setData({ ...data, cPassword: e.target.value })}
          required
        />
        {!passwordMatch && <div className="text-danger">Passwords do not match</div>}
      </div>

      

      <button type="submit" className="btn btn-success">
        Create
      </button>
    </form>
    <br />
  </div>
</div>
  
  );
};


export default CreateEmployee;
