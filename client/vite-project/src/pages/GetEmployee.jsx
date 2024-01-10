import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import AdminNavBar from '../components/adminNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './getemployee.css';

function GetEmployee() {
  const [employee, setEmployee] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const { data } = await axios.get('/employee/getEmployee');
        setEmployee(data);
        setEmployeeCount(data.length);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch employee data');
      }
    };

    getEmployee();
  }, []);

  const deleteEmployee = async (employeeId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this item?');

    if (shouldDelete) {
      try {
        await axios.delete(`/employee/deleteEmployee/${employeeId}`);
        toast.success('Item deleted successfully');
        setEmployee(prevEmployees => prevEmployees.filter(emp => emp._id !== employeeId));
        setEmployeeCount(prevCount => prevCount - 1);
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete item');
      }
    }
  };

  // Filter employees based on the search term
  const filteredEmployees = employee.filter((emp) =>
    emp.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div><AdminNavBar /></div>
      <div className='container'>
        <div className='title'>
          <h1 className="item-list-title">Employee List</h1>
        </div>
        <Link to="/createEmployee" className='add-new-button'>Add +</Link>
        <div className='item-list-buttons'>
          <input
            type='text'
            placeholder='Search by Team...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <h3>Total Employees: {employeeCount}</h3>
        <div className="item-list-container">
          <table className="item-list-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>ID Number</th>
                <th>Phone Number</th>
                <th>Team</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.idNumber}</td>
                  <td>{employee.phoneNumber}</td>
                  <td>{employee.team}</td>
                  <td>
                    <Link to={`/updateEmployee/${employee._id}`} className='btn btn-success mr-2'>Update</Link>
                    <button className='btn btn-danger' onClick={() => deleteEmployee(employee._id)}>Delete</button>
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

export default GetEmployee;
