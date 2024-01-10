import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contex/userContex"; // Correct the typo in "context"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import AdminNavBar from '../components/adminNavBar';
import './customerAdmin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComments, faLifeRing } from '@fortawesome/free-solid-svg-icons'; // Choose appropriate icons


function CustomerAdminPage() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
      });
    }

    axios.get("/total-users")
      .then(({ data }) => {
        setTotalUsers(data.totalUsers);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching total users:", error);
        setIsLoading(false);
      });
  }, [user, setUser]);

  return (
    <div className="customer-admin-container">
      <AdminNavBar />
      <div className="bg-image">
        <br></br>
        <br></br>
        <br></br>
        <div className="admin-box customer-list-box">
  <h3>Customer List</h3>
  <Link to="/CustomerDetailsPage">
    <FontAwesomeIcon icon={faUser} className="icon" />
    View Customer Details
  </Link>
</div>

<div className="admin-box feedbacks-box">
  <h3>Feedbacks</h3>
  <Link to="/Seefeedbacks">
    <FontAwesomeIcon icon={faComments} className="icon" />
    See Feedbacks
  </Link>
</div>

<div className="admin-box support-box">
  <h3>Support</h3>
  <Link to="/seesupport">
    <FontAwesomeIcon icon={faLifeRing} className="icon" />
     Go to Support
  </Link>
</div>
      </div>
    </div>
  );
}

export default CustomerAdminPage;
