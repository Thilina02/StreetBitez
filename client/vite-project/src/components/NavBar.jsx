import React, { useContext, useState } from "react";
import { UserContext } from "../../contex/userContex";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,

  faUserPlus,
  faSignInAlt,
  faUser,
  faSignOutAlt,
  faEnvelope, // Import the icon you want to use for Contact Us
} from "@fortawesome/free-solid-svg-icons";
import "../components/NavBar.css";
import logo from "../images/123.png";
import "./NavBar.css";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showContactDropdown, setShowContactDropdown] = useState(false);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      try {
        await axios.post("/logout");
        setUser(null);
        navigate("/login"); // Redirect to the login page
        toast.success("Logout successful"); // Show success message
      } catch (error) {
        console.log(error);
        toast.error("Failed to logout"); // Show error message
      }
    }
  };

  const toggleContactDropdown = () => {
    setShowContactDropdown(!showContactDropdown);
  };

  return (
    <div className="navbar-container">
      <div className="menu-bar1">
        <div className="logo1">
          <img src={logo} alt="Logo" />
        </div>

        <Link to={user ? "/dashbord" : "/"}>

          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        <Link to="#" onClick={toggleContactDropdown}>
          <FontAwesomeIcon icon={faEnvelope} /> Contact Us
        </Link>
        {showContactDropdown && (
          <div className="contact-info-dropdown">
            <div className="white-box">
            <p className="contact-info"><strong>Email:</strong> StreetBitez@gmail.com</p>
            <p className="contact-info"><strong>Address:</strong> 123 Main Street, colombo, Sri Lanka</p>
            <p className="contact-info"><strong>Phone Number:</strong> +123-456-7890</p>

            </div>
          </div>
        )}
        {!user ? (
          <>
            <Link to="/register">
              <FontAwesomeIcon icon={faUserPlus} /> Register
            </Link>
            <Link to="/login">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Link>
          
          </>
        ) : (
          <>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} /> Profile
            </Link>
            <Link to="/" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
