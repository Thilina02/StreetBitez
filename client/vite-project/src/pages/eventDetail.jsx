import React from 'react';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import brithday from '../images/brithday.jpeg';
import './eventDetail.css';

export default function eventDetail() {
  const navigate = useNavigate();

  
  return (

    <div className="heshani-image1">

    <div className="heshani-detail-container1">
     
           <img src={brithday} alt="Event1" className="background-heshani1" />
         
         <div className="heshani-details-content1">
        <h2>SEASONAL OFFERS!</h2>
        <div className="heshani-proposal-details1">
          <h2>EVENT PROPOSAL DETAILS</h2>
          <ul className="heshani-table">
          <li>
              <strong>Event Name:</strong> Birthday Party
            </li>
            <li>
              <strong>Number of crowd expected:</strong> 50
            </li>
            <li>
              <strong>Theme:</strong> Black and white
            </li>
            <li>
              <strong>Event time:</strong> Night function
            </li>
            <li>
              <strong>Event location:</strong> Outdoor
            </li>
            <li>
              <strong>Extra needs:</strong>
              <ul>
                <li>DJ and Disco</li>
                <li>Furniture Hire</li>
                <li>Styling & Decor</li>
                <li>Food and Beverages</li>
                <li>Liquor</li>
              </ul>
            </li>
            <li>
              <strong>Budget:</strong> RS.60000/=
            </li>
          </ul>
          <button   onClick={() => navigate('/eventSuccess')}
            type="submit" className="heshanibtn btn-primary">
            EXCEPT
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