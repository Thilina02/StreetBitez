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
import NavBar from '../components/NavBar';


export default function Home() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="home-containerz">
      <NavBar/>
      <div className="bghome-image"></div>
      <div className="content">
        <br></br>
        <br></br>
        <h1>Street Bitez</h1>
        <h5>Explore a wide range of delicious food options.</h5>
        <br></br>
        <div className="frame-container">
          <div className="frame">
            <h4>Our Restaurants</h4>
            <img src={foodImage1} alt="Food 1" />
            <p>
              "Experience culinary excellence at Our Restaurants. Enjoy a diverse menu of mouthwatering dishes prepared with the finest ingredients, served in a warm and inviting ambiance. Discover the perfect blend of flavors and exceptional service at Our Restaurants."
            </p>
            <Link to="/OurStallsHomePage">
              <button className="button">See More..</button>
            </Link>
          </div>
          <div className="frame">
            <h4>Book Your Event</h4>
            <img src={foodImage2} alt="Food 2" />
            <p>
              "Host your special event with us at Book Your Event. Create unforgettable memories in our stunning venue, tailored to your unique occasion. Our team will ensure every detail is taken care of, leaving you free to enjoy your celebration. Book Your Event and make it an unforgettable experience."
            </p>
            <Link to="/eventHome">
              <button className="button">Book Now</button>
            </Link>
          </div>
          <div className="frame">
            <h4>See Menu</h4>
            <img src={foodImage3} alt="Food 3" />
            <p>
              "Explore our mouthwatering menu at See Menu. Indulge in a variety of delicious dishes, crafted with passion and finest ingredients. From savory appetizers to delectable desserts, our menu offers a culinary delight for every palate. Visit See Menu and satisfy your cravings today."
            </p>
            <Link to="/menu">
              <button className="button">See Menu..</button>
            </Link>
          </div>
        </div>
        <h2>Take a Quick Look</h2>
        <div className="slideshow-container">
          <Slider {...settings}>
            <div className="slide">
              <img src={slideImage1} alt="Slide 1" />
            </div>
            <div className="slide">
              <img src={slideImage2} alt="Slide 2" />
            </div>
            <div className="slide">
              <img src={slideImage3} alt="Slide 3" />
            </div>
            <div className="slide">
              <img src={slideImage4} alt="Slide 4" />
            </div>
          </Slider> 

          <br></br>
          <div className="additional-container">
          <div className="additional-boxes">
          <div className="box">
          <img src={boximage} alt="Driver" style={{ width: '150px', height: '150px' }} />
            <h4>Become a driver</h4>
            <p>As a delivery Driver you can make reliable money-working anytime,any where.</p>
            <Link to="/driver-login">
              <button className="button">Start Earning</button>
            </Link>
          </div>
          <div className="box">
          <img src={boximage2} alt="stall" style={{ width: '150px', height: '150px' }} />
            <h4>Become a partner</h4>
            <p>Grow your business and reach new customers by partnering with us.</p>
            <Link to="/stallreq">
              <button className="button">Sign up your store</button>
            </Link>
          </div>
          </div>
        </div>

          <br></br> 
          <hr></hr>
          <Footer/>
        </div>
      
      </div>
      
    </div>
  );
}
