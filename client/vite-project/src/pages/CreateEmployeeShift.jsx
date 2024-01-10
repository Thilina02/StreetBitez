import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from 'react-hot-toast'
import AdminNavBar from '../components/adminNavBar';
import './createemployeeshift.css'

const CreateEmployeeShift = (e) => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        team: '',
        date: '',
        time: '',
        venue: '',
        task: '',
        
    });

    

    

    const createEmployeeShift = async (e) => {
        e.preventDefault();

       // Create a FormData object
 const { team,date,time,venue,task,done } = data;
        try {
           const data = await axios.post('/employee/createEmployeeShift', { team,date,time,venue,task,  });
           if(data.error) {
            toast.error(data.error)
           }else{
            setData({})
            toast.success('Login Successful.Welcome')
            navigate('/getEmployeeShift'); // Navigate to the employee list page
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
          <h2>Create Employee</h2>
          <form onSubmit={createEmployeeShift} className="was-validated">
            <div className="mb-2">
              <label htmlFor="team" className="form-label">
                Team:
              </label>
              <select
                name="team"
                className="form-control"
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
            </div>
            <div className="mb-2">
              <label htmlFor="date" className="form-label">
                Date:
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                placeholder="Enter Date"
                name="date"
                value={data.date}
                onChange={(e) => setData({ ...data, date: e.target.value })}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="time" className="form-label">
                Time:
              </label>
              <input
                type="time"
                className="form-control"
                id="time"
                placeholder="Enter Time"
                name="time"
                value={data.time}
                onChange={(e) => setData({ ...data, time: e.target.value })}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="venue" className="form-label">
                Venue:
              </label>
              <input
                type="text"
                className="form-control"
                id="venue"
                placeholder="Enter Venue"
                name="venue"
                value={data.venue}
                onChange={(e) => setData({ ...data, venue: e.target.value })}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="task" className="form-label">
                Task:
              </label>
              <input
                type="text"
                className="form-control"
                id="task"
                placeholder="Enter Task"
                name="task"
                value={data.task}
                onChange={(e) => setData({ ...data, task: e.target.value })}
                required
              />
            </div>
      
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
      
    );
};

export default CreateEmployeeShift;



