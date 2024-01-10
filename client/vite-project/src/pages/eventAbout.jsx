import React from 'react';
import './eventAbout.css';
import chooseus from '../images/chooseus.jpg';
import { useNavigate } from 'react-router-dom';

export default function EventAbout() {
  const navigate = useNavigate();
  return (
    <div className="event-heshani-container22">
      <div className="background-image-heshani22">
        <img src={chooseus} alt="Event" className="heshani-image22" />
      </div>
      <div className="heshanicard-container22">
        <div className="card why-choose-us22">
          <div className="heshani-icon22">
            <i className="fas fa-cogs"></i>
         
          <h1>Why Choose Us</h1>
          <div className="heshanicard22">
          <p text-size="23px">We curate your event using the latest technology and equipment available in the market.</p>
       </div>
        <div className="heshanicard22">
          <div className="heshani-icon22">
            <i className="fas fa-users"></i>
          </div>
          <h3>Experience & Expertise</h3>
          <p>With 5 years of experience, we work extensively with various clients and events.</p>
        </div>
        <div className="heshanicard22">
          <div className="heshani-icon22">
            <i className="fas fa-money-check"></i>
          </div>
          <h3>Cost Efficient</h3>
          <p>Our services are affordable without compromising on quality.</p>
        </div>
      </div> 
      <button
  onClick={() => navigate('/eventHome')}
  type="submit"
  className="heshanibtn "
>
  BACK TO EVENT HOME PAGE
</button>
    
      <footer className="heshanifooter22">
      <div className="heshanicard22">
        <div className="container">
          <div className="contact-section">
            <h4>Contact Us</h4>
            <p>Phone: 123-456-7890</p>
            <p>Email: info@foodstore.com</p>
        <p className="text-center">All rights reserved &copy;</p>
        </div></div> </div>
      </footer>
    </div> </div></div> 
        
  );
}
