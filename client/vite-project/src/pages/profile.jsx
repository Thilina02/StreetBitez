// Profile.js

import React, { useContext } from 'react';
import { UserContext } from '../../contex/userContex';
import { Link } from 'react-router-dom';
import './Profile.css'; // Make sure to import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../components/NavBar';
 // You can choose any icon you prefer


export default function Profile() {
  const { user } = useContext(UserContext);

  return (
    <div className="profile-container">
      <NavBar/>
      <div className="bgp-image"></div>
      <div className="content">
        
        {user ? (
          <div className="profile-box"> 
           <FontAwesomeIcon icon={faUser} className="profile-icon" />
    <h2 className="profile-heading">Profile</h2>
          <hr></hr>
            <div className="profile-section">
              <label className="profile-label">Name:</label>
              <span className="profile-value">{user.name}</span>
            </div>
            <hr></hr>
            <div className="profile-section">
              <label className="profile-label">Address:</label>
              <span className="profile-value">{user.address}</span>
            </div>
            <hr></hr>
            <div className="profile-section">
              <label className="profile-label">city:</label>
              <span className="profile-value">{user.city}</span>
            </div>
            <hr></hr>
            <div className="profile-section">
              <label className="profile-label">province:</label>
              <span className="profile-value">{user.province}</span>
            </div>
            <hr></hr>
            <div className="profile-section">
              <label className="profile-label">Phone Number:</label>
              <span className="profile-value">{user.phonenumber}</span>
            </div>
            <hr></hr>
            <div className="profile-section">
              <label className="profile-label">Email:</label>
              <span className="profile-value">{user.email}</span>
            </div>
            <br></br>
            <div className="edit-button1">
            <Link to={`/edit/${user._id}`}>
  <button>Edit Account</button>
</Link>
            </div>
          </div>
        ) : (
          <p>You need to be logged in to view the profile. Please log in.</p>
        )}
      </div>
      
    </div>
  );
}
