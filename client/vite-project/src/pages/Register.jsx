import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './register.css';

import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    address: '',
    city: '',
    province: '',
    phonenumber: '',
    email: '',
    password: '', // Add the password field here
    userType: 'customer',
    securityQuestion: '',
    securityAnswer: '',
  });
  const validateName = (name) => {
    return /^[A-Za-z\s]+$/.test(name);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    if (validateName(newName) || newName === '') {
      setData({ ...data, name: newName });
    }
  };
  const provincesInSriLanka = [
    'Central Province',
    'Eastern Province',
    'North Central Province',
    'Northern Province',
    'North Western Province',
    'Sabaragamuwa Province',
    'Southern Province',
    'Uva Province',
    'Western Province',
  ];

  const securityQuestions = [
    "What is your mother's maiden name?",
    'What is the name of your first pet?',
    'Where were you born?',
  ];

  const registerUser = async (e) => {
    e.preventDefault();
    const {
      name,
      address,
      city,
      province,
      phonenumber,
      email,
      password,
      userType,
      securityQuestion,
      securityAnswer,
    } = data;

    try {
      const { data: response } = await axios.post('/register', {
        name,
        address,
        city,
        province,
        phonenumber,
        email,
        password,
        userType,
        securityQuestion,
        securityAnswer,
      });

      if (response.error) {
        toast.error(response.error);
      } else {
        setData({
          name: '',
          address: '',
          city: '',
          province: '',
          phonenumber: '',
          email: '',
          password: '', // Clear the password field after successful registration
          userType: 'customer',
          securityQuestion: '',
          securityAnswer: '',
        });
        toast.success('Registration successful, welcome!');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateLetters = (input) => {
    const regex = /^[A-Za-z]+$/; // Regular expression to allow only letters (A-Z, a-z)
    return regex.test(input) || input === '';
  };

  return (
    <div className="form-containerReg">
      <NavBar/>
      <br></br>
      <br></br>
      <br></br>
    <div className="bgr-image"></div>
    <div className="content form-box">
      <br />
      <h2>Register</h2>
      <form action="/action_page.php" className="was-validated" onSubmit={registerUser}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3 mt-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={data.name}
                onChange={(e) => {
                  if (validateLetters(e.target.value)) {
                    setData({ ...data, name: e.target.value });
                  }
                }}
                required
              />
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 mt-3">
              <label htmlFor="address" className="form-label">
                Address:
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter address"
                value={data.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
                required
              />
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {/* Second pair of input boxes */}
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City:
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Enter city"
                value={data.city}
                onChange={(e) => setData({ ...data, city: e.target.value })}
                required
              />
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </div>
          </div>
          <div className="col-md-6">
            {/* Third pair of input boxes */}
            <div className="mb-3">
              <label htmlFor="province" className="form-label">
                Province:
              </label>
              <select
                className="form-select"
                id="province"
                value={data.province}
                onChange={(e) => setData({ ...data, province: e.target.value })}
                required
              >
                <option value="">Select your province</option>
                {provincesInSriLanka.map((province, index) => (
                  <option key={index} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please select a province.</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {/* Fourth pair of input boxes */}
            <div className="mb-3">
              <label htmlFor="phonenumber" className="form-label">
                Phone Number:
              </label>
              <input
                type="tel"
                className="form-control"
                id="phonenumber"
                placeholder="Enter phone number"
                value={data.phonenumber}
                onChange={(e) => {
                  const phoneNumber = e.target.value.replace(/[^0-9]/g, '');
                  setData({ ...data, phonenumber: phoneNumber });
                }}
                required
              />
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </div>
          </div>
          <div className="col-md-6">
            {/* Fifth pair of input boxes */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={data.email}
                onChange={(e) => {
                  const emailValue = e.target.value;
                  setData({ ...data, email: emailValue });
                }}
                onBlur={(e) => {
                  const emailValue = e.target.value;
                  if (!emailValue.includes('@')) {
                    console.log('Invalid email address');
                  }
                }}
                required
              />
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {/* Sixth pair of input boxes */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </div>
          </div>
          <div className="col-md-6">
            {/* Seventh pair of input boxes */}
            <div className="mb-3">
              <label htmlFor="securityQuestion" className="form-label">
                Security Question:
              </label>
              <select
                className="form-select"
                id="securityQuestion"
                value={data.securityQuestion}
                onChange={(e) => setData({ ...data, securityQuestion: e.target.value })}
                required
              >
                <option value="">Select a security question</option>
                {securityQuestions.map((question, index) => (
                  <option key={index} value={question}>
                    {question}
                  </option>
                ))}
              </select>
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please select a security question.</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {/* Eighth pair of input boxes - Add the password field here */}
            <div className="mb-3">
              <label htmlFor="securityAnswer" className="form-label">
                Security Answer:
              </label>
              <input
                type="text"
                className="form-control"
                id="securityAnswer"
                placeholder="Enter your answer"
                value={data.securityAnswer}
                onChange={(e) => setData({ ...data, securityAnswer: e.target.value })}
                required
              />
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </div>
          </div>
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="myCheck"
            name="remember"
            required
          />
          <label className="form-check-label" htmlFor="myCheck">
            Above details are correct.
          </label>
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Check this checkbox to continue.</div>
        </div>
        <button type="submit" className="btn btn-primaryR">
          Submit
        </button>
      </form>
      <br />
    </div>
  </div>
  );
}
