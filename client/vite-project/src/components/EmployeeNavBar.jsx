import React, { useContext, useState } from "react";
import { EmployeeContext } from "../../contex/EmployeeContext";
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
import "./employeenavbar.css";

export default function EmployeeNavBar() {
  const { employee, setEmployee } = useContext(EmployeeContext);
  const navigate = useNavigate();
  const [showContactDropdown, setShowContactDropdown] = useState(false);

  const handleEmployeeLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      try {
        await axios.post("/employee/employeeLogout");
        setEmployee(null);
        navigate("/loginemployee"); // Redirect to the login page
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

        <Link to={employee ? "/employeeDashboardHome" : "/"}>

          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        <Link to="#" onClick={toggleContactDropdown}>
          <FontAwesomeIcon icon={faEnvelope} /> Contact Us
        </Link>
        {showContactDropdown && (
          <div className="contact-info-dropdown">
            <div className="white-box">

              <p><strong>Email:</strong> StreetBitez@gmail.com</p>
              <p><strong>Address:</strong> 123 Main Street, colombo, Sri lanka</p>
              <p><strong>Phone Number:</strong> +123-456-7890</p>

            </div>
          </div>
        )}
        {!employee ? (
          <>
            
            <Link to="/login">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Link>
          
          </>
        ) : (
          <>
            <Link to="/employeeProfileA">
              <FontAwesomeIcon icon={faUser} /> Profile
            </Link>
            <Link to="/loginemployee" onClick={handleEmployeeLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
