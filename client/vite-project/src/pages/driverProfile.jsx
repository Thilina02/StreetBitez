import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import boximage from '../images/driver10.jpg'
import './driverProfile.css'

const DriverProfile = () => {
  const [driverProfile, setDriverProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Make a GET request to retrieve the driver's profile data
    axios
      .get('http://localhost:8000/drivers/getDriverData')
      .then((response) => {
        setDriverProfile(response.data);
      })
      .catch((error) => {
        console.error('Error fetching driver profile data:', error);
      });
  }, []);

  const handleDeleteProfile = () => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const driverId = driverProfile.id; 

    if (window.confirm('Are you sure you want to delete your profile?')) {
      axios
        .delete(`http://localhost:8000/drivers/deleteDriver/${driverId}`)
        .then((response) => {
          console.log('Profile deleted successfully');
          navigate('/');
        })
        .catch((error) => {
          console.error('Error deleting driver profile:', error);
        });
    }
  };

  return (
    <div className='driver-profile-content'>
    <div className="container-fluid mt-5">
      <img src={boximage} alt="" className="driver-profile-image" />
      <h1>Driver Profile</h1>
      {driverProfile ? (
        <div>
          <p>
            <strong>Username:</strong> {driverProfile.username}
          </p>
          <p>
            <strong>Email:</strong> {driverProfile.email}
          </p>
          <p>
            <strong>Mobile:</strong> {driverProfile.mobile}
          </p>
          <p>
            <strong>NIC:</strong> {driverProfile.nic}
          </p>
          <p>
            <strong>Province:</strong> {driverProfile.province}
          </p>
          <p>
            <strong>Gender:</strong> {driverProfile.gender}
          </p>
          
          <br></br>
          <br></br>
          <Link to={`/driver-update/${driverProfile.id}`} className="btn btn-primary mx-1">
            Update Profile
          </Link>
          <button className="btn btn-danger mx-1" onClick={handleDeleteProfile}>
            Delete Profile
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>

  );
};

export default DriverProfile;