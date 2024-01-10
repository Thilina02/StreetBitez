import React from 'react';
import AdminNavBar from '../components/adminNavBar';
import confirm from '../images/confirm.jpg';
import './eventConfirm.css';

import { useNavigate } from 'react-router-dom';



export default function adminConfirm() {
  const navigate = useNavigate();
  return (
    <div className='heshani-border21'>
    <div className="heshani-image21">
    <img src={confirm} alt="Event" className="background-heshani21" />
    <div className="heshani-confirm21">
    <div className="heshani-container">
      <h1 className="heshani-heading">CONFIRM!</h1>
      <h2 className="heshani-heading">MAKE FURTHER REQUIREMENTS!</h2>
      <p>Your request has been successfully processed.</p>
      <p>You may inform the customer through EMAIL.</p>

      <div className="button-container">
       
        <button onClick={() => navigate('/eventList')} className="heshanibtn btn-primary21">
          Customer Event Details
        </button>
      </div>
      <hr />
      <footer className="footer">
        <div className="container">
          <div className="contact-section">
            <h4>Contact Us</h4>
            <p>Phone: 123-456-7890</p>
            <p>Email: info@foodstore.com</p>
          </div>
          <div className="social-section">
            {/* Add your social media links here */}
          </div>
          <hr />
          <p className="text-center">All rights reserved &copy; </p>
        </div>
      </footer>
    </div></div></div></div>
  );
}



