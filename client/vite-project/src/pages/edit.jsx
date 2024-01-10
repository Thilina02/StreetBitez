import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import './edit.css';
import NavBar from '../components/NavBar';

export default function Edit() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    address: '',
    city: '',
    province: '',
    phonenumber: '',
    email: '',
    password: '',
  });

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/profile`);
        setData({
          name: data.name,
          address: data.address,
          city: data.city,
          province: data.province,
          phonenumber: data.phonenumber,
          email: data.email,
          password: '',
        });
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch user data');
      }
    };

    fetchUser();
  }, [userId]);

  const updateUser = async () => {
    try {
      await axios.put(`/usersB/${userId}`, data);
      toast.success('User updated successfully');
      navigate('/dashbord');
    } catch (error) {
      console.log(error);
      toast.error('Failed to update user');
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`/usersD/${userId}`);
      toast.success('User deleted successfully');
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete user');
    }
  };

  const validateLetters = (input) => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(input) || input === '';
  };

  return (
    <div className="form-container">
      <NavBar/>
    <div className="bg-image"></div>
    <div className="content form-box">
      <br />
      <h2>Edit Profile</h2>
      <form className="was-validated">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name..."
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
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address:
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter address..."
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
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City:
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Enter city..."
                value={data.city}
                onChange={(e) => {
                  if (validateLetters(e.target.value)) {
                    setData({ ...data, city: e.target.value });
                  }
                }}
                required
              />
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </div>
          </div>
  
          <div className="col-md-6">
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
            <div className="mb-3">
              <label htmlFor="phonenumber" className="form-label">
                Phone Number:
              </label>
              <input
                type="tel"
                className="form-control"
                id="phonenumber"
                placeholder="Enter phone number..."
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
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email..."
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </div>
          </div>
        </div>
  
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter new password..."
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </div>
          </div>
        </div>
  
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-primary" onClick={updateUser}>
            Update
          </button>
          <button type="button" className="btn btn-danger" onClick={deleteUser}>
            Delete My Account
          </button>
        </div>
      </form>
      <br />
    </div>
  </div>
  
  );
}
