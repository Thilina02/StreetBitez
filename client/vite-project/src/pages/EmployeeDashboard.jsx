import React from 'react'
import './EmployeeDashboard.css';
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import { Link, useNavigate } from "react-router-dom";
 import AdminNavBar from '../components/adminNavBar';
 import './EmployeeDashboard.css';
 import { useEffect,useState } from 'react';
 import axios from 'axios';

const EmployeeDashboard = () => {

  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const response = await axios.get('/employee/getEmployee');
        setEmployeeCount(response.data.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployeeCount();
  }, []);

  return (
    
<div className="inventory-item-container">
      <AdminNavBar />
     
      <div className="bg-image">
        <br></br>
        <br></br>
        <br></br>
        <div className="inv-list food-list">
          <h3>Employee</h3>
          <Link to="/getEmployee">View Employee Details</Link>
        </div>
        <div className="inv-list furniture-list">
          <h3>Employee Shift</h3>
          <Link to="/getEmployeeShift">View Shift Details</Link>
        </div>
        <div className="inv-list machinery-list">
          <h3>Employee Leaves</h3>
          <Link to="/getEmployeeLeaveA">View Leave Details</Link>
        </div>
        <div className="inv-list issued-list">
          <h3>Employee Notices</h3>
          <Link to="/getEmployeeNews">View Notice Details</Link>
        </div>
        <div className="inv-list reports-list">
          <h3>Employee Salary</h3>
          <Link to="/getEmployeeSalary">View Salary Details</Link>
        </div>
        <div className="inv-list reports-list">
          <h3>Employee Contact</h3>
          <Link to="/getEmployeeContact">View Contact Details</Link>
        </div>
      </div>
    </div>
    
        
        
   
    


  )
}

export default EmployeeDashboard