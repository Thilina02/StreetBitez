import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNavBar from '../components/adminNavBar';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function GetEmployeeShift() {
  const [employeeShift, setEmployeeShift] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getEmployeeShift = async () => {
      try {
        const { data } = await axios.get('/employee/getEmployeeShift');
        setEmployeeShift(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch employee data');
      }
    };

    getEmployeeShift();
  }, []);

  const deleteEmployeeShift = async (shiftId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this item?');

    if (shouldDelete) {
      try {
        await axios.delete(`/employee/deleteEmployeeShift/${shiftId}`);
        toast.success('Item deleted successfully');
        setEmployeeShift(prevShifts => prevShifts.filter(shift => shift._id !== shiftId));
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete item');
      }
    }
  };

  const filteredEmployees = employeeShift.filter((emp) =>
    emp.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div><AdminNavBar /></div>
      <div className='container'>
        <div className='title'>
          <h1 className="item-list-title">Employee Shift</h1>
        </div>
        
            <Link to="/createEmployeeShift" className='btn btn-success mb-3'>Add +</Link>
            <div className='item-list-buttons'>
          <input
            type='text'
            placeholder='Search by Team...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
          </div>
          <div className="item-list-container">
          <table className="item-list-table">
            <thead>
              <tr>
                <th>Team</th>
                <th>Date</th>
                <th>Time</th>
                <th>Venue</th>
                <th>Task</th>
                <th>Status</th> {/* Changed 'Done' to 'Status' */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((shift) => (
                <tr key={shift._id}>
                  <td>{shift.team}</td>
                  <td>{shift.date}</td>
                  <td>{shift.time}</td>
                  <td>{shift.venue}</td>
                  <td>{shift.task}</td>
                  <td>
                    {shift.done ? (
                      <span className="text-success">Completed</span>
                    ) : (
                      <span className="text-warning">Incomplete</span>
                    )}
                  </td>
                  <td>
                    <Link to={`/updateEmployeeShift/${shift._id}`} className='btn btn-success mr-2'>Update</Link>
                    <button className='btn btn-danger' onClick={() => deleteEmployeeShift(shift._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      
  );
}

export default GetEmployeeShift;
