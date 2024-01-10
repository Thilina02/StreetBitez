import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contex/userContex"; // Correct the typo in "context"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import AdminNavBar from '../components/adminNavBar';
import './invList.css'

function InvList() {
    const navigate = useNavigate();
    const category = {"Food":"Food"};

  

  return (
    <div className="dihan-inventory-item-container"> {/* Updated class name */}
    <AdminNavBar />
    <div className="dihan-bg-image"> {/* Updated class name */}
        <br></br>
        <br></br>
        <br></br>
        <div className="dihan-inv-list dihan-food-list"> {/* Updated class name */}
            <h3>Food</h3>
            <Link to={{ pathname: "/itemlist", state: { category: "Food" } }}>View Food Item Details</Link>
        </div>
        <div className="dihan-inv-list dihan-furniture-list"> {/* Updated class name */}
            <h3>Furniture</h3>
            <Link to={{ pathname: "/itemlistFur", state:  "Furniture" }}>View Furniture Item Details</Link>
        </div>
        <div className="dihan-inv-list dihan-machinery-list"> {/* Updated class name */}
            <h3>Machinery</h3>
            <Link to={{ pathname: "/itemlistMac", state:  "Machinery" }}>View Machinery Item Details</Link>
        </div>
        <div className="dihan-inv-list dihan-issued-list"> {/* Updated class name */}
            <h3>Issued</h3>
            <Link to={{ pathname: "/Issued", state:  "Issued" }}>View Issued Item Details</Link>
        </div>
    </div>
</div>
);
}

export default InvList;
