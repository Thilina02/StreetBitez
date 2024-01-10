import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';
import foodImage1 from '../images/res.jpeg';
import foodImage2 from '../images/event.jpg';
import foodImage3 from '../images/menu.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slideImage1 from '../images/bg1.jpg';
import slideImage2 from '../images/bg2.jpeg';
import slideImage3 from '../images/bg3.jpg';
import slideImage4 from '../images/bg4.jpg'
import boximage from '../images/delivery-man-riding-red-scooter-illustration-template-food-delivery-man-vector_864013-125.avif'
import boximage2 from '../images/stall.avif'
import Footer from "../components/Footer";

export default function driverDashboard() {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="home-container">
      <div className="container-fluid text-center mt-5">
        <h2>Welcome, Driver!</h2>
        <p>This is your dashboard.</p>
        
        {/* Button to navigate to driver's profile */}
        <Link to="/driver-profile">
          <buttonD className="btn btn-primary mt-3">View Profile</buttonD>
        </Link>
      </div>
      <div className='row'>
        <div className='col-6 text-center py-5'>
          <br />
          <h2 className='mt-4 text-primary'>You are Valuable to Us</h2>
          <p className='text-secondary'>
            At our company, we deeply value the contributions and dedication of our drivers. Your hard work and commitment ensure our success, and we appreciate you. Thank you for being an essential part of our team!
          </p>
        </div>
        <div className='col-6'>
          <img src={boximage} alt="" width="87%" height="90%" />
        </div>
      </div>
      <div className="container-fluid mb-5 mt-5">
        <h2 className="text-center mb-4">How It Works for Food Delivery Drivers</h2>
        <div className="row">
          <div className="col-md-3">
            <div className="border border-primary rounded p-3 mb-4" style={{ height: '200px' }}>
              <div className="mb-3">
                <strong className='text-secondary'>Step 1:</strong>
              </div>
              <h4>Sign Up</h4>
              <p>Create a driver account and provide necessary details.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="border border-primary rounded p-3 mb-4" style={{ height: '200px' }}>
              <div className="mb-3">
                <strong className='text-secondary'>Step 2:</strong>
              </div>
              <h4>Partner with Restaurants</h4>
              <p>Collaborate with local restaurants to become their delivery partner.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="border border-primary rounded p-3 mb-4" style={{ height: '200px' }}>
              <div className="mb-3">
                <strong className='text-secondary'>Step 3:</strong>
              </div>
              <h4>Receive Orders</h4>
              <p>Receive food orders from customers through the platform.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="border border-primary rounded p-3 mb-4" style={{ height: '200px' }}>
              <div className="mb-3">
                <strong className='text-secondary'>Step 4:</strong>
              </div>
              <h4>Pick Up Orders</h4>
              <p>Go to the restaurant, pick up the prepared orders, and check order details.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="border border-primary rounded p-3 mb-4" style={{ height: '200px' }}>
              <div className="mb-3">
                <strong className='text-secondary'>Step 5:</strong>
              </div>
              <h4>Deliver to Customers</h4>
              <p>Deliver the food orders to customers' addresses promptly and courteously.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="border border-primary rounded p-3 mb-4" style={{ height: '200px' }}>
              <div className="mb-3">
                <strong className='text-secondary'>Step 6:</strong>
              </div>
              <h4>Confirm Delivery</h4>
              <p>Confirm the delivery in the app and ensure customer satisfaction.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="border border-primary rounded p-3 mb-4" style={{ height: '200px' }}>
              <div className="mb-3">
                <strong className='text-secondary'>Step 7:</strong>
              </div>
              <h4>Payment</h4>
              <p>Receive payment for successful deliveries through the platform.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="border border-primary rounded p-3 mb-4" style={{ height: '200px' }}>
              <div className="mb-3">
                <strong className='text-secondary'>Step 8:</strong>
              </div>
              <h4>Repeat!</h4>
              <p>Continue delivering food and delighting customers.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
