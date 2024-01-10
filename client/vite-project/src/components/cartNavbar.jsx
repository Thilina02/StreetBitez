import { useContext } from "react";
import { UserContext } from "../../contex/userContex";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../components/NavBar.css";
import logo from "../images/123.png";
import "./NavBar.css"

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

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

  return (
    <div className="menu-bar1">
       <div className="logo1">
        <img src={logo} alt="../image/123.png" />
      </div>
      <Link to={user ? "/dashbord" : "/"}>Home</Link>
      <Link to='/cart'>Cart</Link>
      
     
         
          <button onClick={handleLogout}>Logout</button>

          
       
      
    </div>
  );
}
