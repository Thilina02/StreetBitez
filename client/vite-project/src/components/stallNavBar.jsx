import {Link} from "react-router-dom"

export default function stallNavBar() {
  return (
    <div className="stall-menu-bar">
    <Link to="/stall-dashboard">Dashboard</Link>
    <Link to="/stall-orders">Orders</Link>
    <Link to="/stall-menu">Menu</Link>
    <Link to="/stall-profile">Profile</Link>
    <button onClick={handleLogout}>Logout</button>
  </div>
  );
}

