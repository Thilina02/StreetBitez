import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateDriverProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    email: '',
    mobile: '',
    province: '',
    password: '',
  });

  useEffect(() => {
    async function fetchDriverData() {
      try {
        const response = await axios.get(`http://localhost:8000/drivers/getDriver/${id}`);
        const driverData = response.data;
        console.log(driverData)
        setData({
          username: driverData.username,
          email: driverData.email,
          mobile: driverData.mobile,
          province: driverData.province,
          password: '',
        });
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    }

    fetchDriverData();
  }, [id]);

  const updateDriver = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/drivers/driverupdate/${id}`, data);
      toast.success('Driver updated successfully');
      navigate('/driver-dashboard');
    } catch (error) {
      console.error('Error updating driver:', error);
      toast.error('Failed to update driver');
    }
  };

  return (
    <div className="form-container">
      <div className="driver-content mt-5 form-box">
        <br />
        <h2>Update Driver's Profile</h2>
        <form onSubmit={updateDriver}>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              className="form-control"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="tel"
              placeholder="Enter Mobile Number"
              autoComplete="off"
              className="form-control"
              value={data.mobile}
              onChange={(e) => setData({ ...data, mobile: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="province">Province</label>
            <select
              className="form-control"
              value={data.province}
              onChange={(e) => setData({ ...data, province: e.target.value })}
            >
              <option value="">Select a Province</option>
              <option value="Western Province">Western Province</option>
              <option value="Central Province">Central Province</option>
              <option value="Southern Province">Southern Province</option>
              <option value="Northern Province">Northern Province</option>
              <option value="Eastern Province">Eastern Province</option>
              <option value="North Central Province">North Central Province</option>
              <option value="North Western Province">North Western Province</option>
              <option value="Uva Province">Uva Province</option>
              <option value="Sabaragamuwa Province">Sabaragamuwa Province</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          <buttonU type="submit" className="btn btn-primary">
            Update
          </buttonU>
        </form>
      </div>
    </div>
  );
}
