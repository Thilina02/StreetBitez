import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-hot-toast';
import AdminNavBar from '../components/adminNavBar';
import './createemployeenews.css'

const CreateEmployeeNews = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    description: '',
  });

  const createEmployeeNews = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const { description } = data;
    try {
      const data = await axios.post('/employee/createEmployeeNews', { description });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success('Employee News Created Successfully');
        navigate('/getEmployeeNews'); // Navigate to the employee list page
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
        <h2>Create Employee News</h2>
        <form onSubmit={createEmployeeNews} className="was-validated">
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              className="form-control"
              id="description"
              placeholder="Enter Description"
              name="description"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              required
            />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
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

export default CreateEmployeeNews;
