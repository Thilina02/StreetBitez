import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Assuming you have toast imported
import AdminNavBar from '../components/adminNavBar';

// Import your CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

function GetEmployeeLeaveA() {
  const [employeeLeave, setEmployeeLeave] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getEmployeeLeave = async () => {
      try {
        const { data } = await axios.get('/employee/getEmployeeLeave');
        setEmployeeLeave(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch employee data');
      }
    };

    getEmployeeLeave();
  }, []);

  const deleteEmployeeLeave = async (leaveId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this item?');

    if (shouldDelete) {
      try {
        await axios.delete(`/employee/deleteEmployeeLeave/${leaveId}`);
        toast.success('Item deleted successfully');
        setEmployeeLeave(prevEmployeeLeaves => prevEmployeeLeaves.filter(leave => leave._id !== leaveId));
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete item');
      }
    }
  };

  const completeLeave = async (leaveId) => {
    try {
      await axios.put(`/employee/completeEmployeeLeave/${leaveId}`, { done: true });
      toast.success('Leave marked as completed');
      setEmployeeLeave((prevLeaves) =>
        prevLeaves.map((leave) =>
          leave._id === leaveId ? { ...leave, done: true } : leave
        )
      );
    } catch (error) {
      console.error(error);
      toast.error('Failed to mark leave as completed');
    }
  };

  const filteredLeaves = employeeLeave.filter((emp) =>
  emp.email.toLowerCase().includes(searchTerm.toLowerCase())
);


 

  return (
    <div>
      <div><AdminNavBar /></div>
      <div className='container'>
        <div className='title'>
          <h1 className="item-list-title">Employee Leaves</h1>
        </div>
        <div className='item-list-buttons'>
          <input
            type='text'
            placeholder='Search by Team...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
          <div className="item-list-container">
          <table className="item-list-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Time</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Done</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave) => (
                <tr key={leave._id}>
                  <td>{leave.name}</td>
                  <td>{leave.email}</td>
                  <td>{leave.type}</td>
                  <td>{leave.time}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.reason}</td>
                  <td>
                    {leave.done ? (
                      <button className='btn btn-danger mr-2' disabled>
                        Completed
                      </button>
                    ) : (
                      <button
                        className='btn btn-success mr-2'
                        onClick={() => completeLeave(leave._id)}
                      >
                        Complete
                      </button>
                    )}
                  </td>
                  <td>
                   
                    <button className='btn btn-danger' onClick={() => deleteEmployeeLeave(leave._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
   
  );
}

export default GetEmployeeLeaveA;
