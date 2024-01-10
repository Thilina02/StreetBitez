import { useContext } from "react";
import { DriverContex } from "../../contex/driverContex";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../components/DriverNavBar.css";
import logo from "../images/123.png";

export default function NavBar() {
  const { user, setUser } = useContext(DriverContext);
  const navigate = useNavigate();


  return (
    <div className="menu-bar1">
       <div className="logo1">
        <img src={logo} alt="../image/123.png" />
      </div>
      <Link to={user ? "/dashbord" : "/"}>Home</Link>
      {!user ? (
        <>

          <Link to="/driver-register">Register</Link>
          <Link to="/drivre-login">Login</Link>
          <Link to="/driver-compOrds">Completed</Link>
          <Link to="/drivre-feedback">Feedback</Link>
          
        </>
      ) : (
        <>
         <Link to="/driver-profile">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}
