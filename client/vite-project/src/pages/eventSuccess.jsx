import React from 'react';
import './eventSuccess.css';
import confirm from '../images/confirm.jpg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function eventSuccess() {
  const navigate = useNavigate();
  return (
    <div className='heshani-border4'>
    <div className="heshani-image41">
    <img src={confirm} alt="Event" className="background-heshani41" />
    <div className="heshani-proposal-details5">
    <div className="success-container">
      <h2 className="success-heading">ACCEPTTED!</h2>
      <h2 className="success-heading">THANK YOU!</h2>
      <p>Make your own Event Proposal with your own ideas and designs.</p>
      <p>Share your ideas with US and make your Event Colorfull</p>
      <p>Thank you for choosing Street Bitz.</p>

      <div className="button-container">
        <Link to="/eventHome" className="btn btn-primary">
          Event Home
        </Link>
        <button onClick={() => navigate('/addNewEvent')} className="btn btn-primary">
          Event Proposal form
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
    </div>  </div></div></div>
  );
}



