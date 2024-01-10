// Profile.js

import React, { useContext } from 'react';
import { EmployeeContext } from '../../contex/EmployeeContext';
import { Link } from 'react-router-dom';
import './employeeprofilea.css'; // Make sure to import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // You can choose any icon you prefer
import EmployeeNavBar from '../components/EmployeeNavBar';


export default function Profile() {
  const { employee } = useContext(EmployeeContext);

  return (
    <div className="profile-container">
        <div><EmployeeNavBar/></div>
      <div className="bgp-image"></div>
      <div className="content">
        
        {employee ? (
          <div className="profile-box"> 
           <FontAwesomeIcon icon={faUser} className="profile-icon" />
    <h2 className="profile-heading">Profile</h2>
          <hr></hr>
            <div className="profile-section">
              <label className="profile-label">Name:</label>
              <span className="profile-value">{employee.name}</span>
            </div>
            <hr></hr>
            <div className="profile-section">
              <label className="profile-label">Email:</label>
              <span className="profile-value">{employee.email}</span>
            </div>
            <hr></hr>
            <div className="profile-section">
              <label className="profile-label">IDNumber:</label>
              <span className="profile-value">{employee.idNumber}</span>
            </div>
            <hr></hr>
            <div className="profile-section">
              <label className="profile-label">Phone Number:</label>
              <span className="profile-value">{employee.phoneNumber}</span>
            </div>
            <hr></hr>
            <div className="profile-section">
              <label className="profile-label">Team:</label>
              <span className="profile-value">{employee.team}</span>
            </div>
            <hr></hr>
            <div className="profile-section">
              <label className="profile-label">Password:</label>
              <span className="profile-value">{employee.password}</span>
            </div>
            <br></br>
            <div className="edit-button1">
            {/* <Link to={`/updateEmployeeProfileA/${employee._id}`}>
  <button>Edit Account</button>
</Link> */}
            </div>
          </div>
        ) : (
          <p>You need to be logged in to view the profile. Please log in.</p>
        )}
      </div>
      
    </div>
  );
}
