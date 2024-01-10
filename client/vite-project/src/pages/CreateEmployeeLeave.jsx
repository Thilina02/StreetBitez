import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-hot-toast';
import AdminNavBar from '../components/adminNavBar';
import './createemployeeleave.css'

const CreateEmployeeLeave = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    email: '',
    type: 'halfday',
    reason: '',
    time:'',
    startDate: '', // Add startDate field
    endDate: '',   // Add endDate field
    leaveDays: 0,  // Add leaveDays field
  });

  useEffect(() => {
    if (data.startDate && data.endDate) {
      // Calculate the number of leave days between the selected dates
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Update the leaveDays field in the state
      setData({ ...data, leaveDays: diffDays + 1 });
    }
  }, [data.startDate, data.endDate]);

  const createEmployeeLeave = async (e) => {
    e.preventDefault();

    const { name, email, type, reason, time, startDate, endDate } = data;

    try {
      const response = await axios.post('/employee/createEmployeeLeave', {
        name,
        email,
        type,
        reason,
        time,
        startDate: type === 'multipledays' ? startDate : null,
        endDate: type === 'multipledays' ? endDate : null,
      });

      if (response.error) {
        toast.error(response.error);
      } else {
        setData({
          name: '',
          email: '',
          type: 'halfday',
          time:'',
          reason: '',
          startDate: '',
          endDate: '',
          leaveDays: 0,
        });
        toast.success('Leave request created successfully');
        navigate('/employeeDashboardHome')
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
  <div className="bgr-image"></div>
  <div className="content form-box">
    <br />
    <h2>Create Employee Leave</h2>
    <form onSubmit={createEmployeeLeave} className="was-validated">
      <div className="mb-3">
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
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter Email"
          name="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />
        <div className="valid-feedback">Valid.</div>
        <div className="invalid-feedback">Please fill out this field.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Leave Type:
        </label>
        <select
          name="type"
          className="form-select"
          value={data.type}
          onChange={(e) => setData({ ...data, type: e.target.value })}
          required
        >
          <option value="halfday">Half Day</option>
          <option value="fullday">Full Day</option>
          <option value="multipledays">Multiple Days</option>
        </select>
        <div className="valid-feedback">Valid.</div>
        <div className="invalid-feedback">Please select a leave type.</div>
      </div>
      {data.type === 'halfday' && (
        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Time:
          </label>
          <select
            name="time"
            className="form-select"
            value={data.time}
            onChange={(e) => setData({ ...data, time: e.target.value })}
            required
          >
            <option value="daytime">Day Time</option>
            <option value="nighttime">Night Time</option>
          </select>
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please select a time.</div>
        </div>
      )}
      {data.type === 'fullday' && (
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date:
          </label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={data.startDate}
            onChange={(e) => setData({ ...data, startDate: e.target.value })}
            required
          />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please select a date.</div>
        </div>
      )}
      {data.type === 'multipledays' && (
        <div>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Start Date:
            </label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={data.startDate}
              onChange={(e) => setData({ ...data, startDate: e.target.value })}
              required
            />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please select a start date.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              End Date:
            </label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              value={data.endDate}
              onChange={(e) => setData({ ...data, endDate: e.target.value })}
              required
            />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please select an end date.</div>
          </div>
          <div className="mb-3">
            <p>Leave Days: {data.leaveDays}</p>
          </div>
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="reason" className="form-label">
          Reason:
        </label>
        <input
          type="text"
          className="form-control"
          name="reason"
          value={data.reason}
          onChange={(e) => setData({ ...data, reason: e.target.value })}
          required
        />
        <div className="valid-feedback">Valid.</div>
        <div className="invalid-feedback">Please fill out this field.</div>
      </div>
      <button type="submit" className="btn btn-primary">Create</button>
    </form>
    <br />
  </div>
</div>

  );
};

export default CreateEmployeeLeave;
