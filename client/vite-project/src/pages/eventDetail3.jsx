import React from 'react';
import './eventDetail3.css';
import freeEvent from '../images/freeEvent.jpg';

import { useNavigate } from 'react-router-dom';

export default function eventDetail() {
  const navigate = useNavigate();
  return (
    <div className="heshani-image3">

    <div className="heshani-detail-container3">
         
           <img src={freeEvent} alt="Event" className="background-heshani3" />
     
    <div className="heshani-details-content3">
     
        <h2>SEASONAL OFFERS!</h2>
        <div className="heshani-proposal-details3">
          <h2>EVENT PROPOSAL DETAILS</h2>
          <ul className="heshani-table">
          <li>
              <strong>Event Name:</strong> Business Event
            </li>
            <li>
              <strong>Number of crowd expected:</strong> 70
            </li>
            <li>
              <strong>Theme:</strong> White and Gold
            </li>
            <li>
              <strong>Event time:</strong> Morning function
            </li>
            <li>
              <strong>Event location:</strong> Indoor
            </li>
            <li>
              <strong>Extra needs:</strong>
              <ul>
                <li>Light Music</li>
                <li>Styling & Decor</li>
                <li>Food and Beverages</li>
                <li>Stage and Furniture</li>
                <li>Liquor</li>
              </ul>
            </li>
            <li>
              <strong>Budget:</strong> RS.65000/=
            </li>
          </ul>
          <button
            onClick={() => navigate('/eventSuccess')}
            type="submit"
            className="btn btn-primary"
          >
            ACCEPT
          </button>
   
  
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
    </div>
    </div>
    </div>
      </div>
  );
}