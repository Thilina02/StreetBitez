import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './StallAdminreq.css';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import '../components/adminNavBar'

function StallAdminreq() {
  const [stallsadminreq, setStallsadminreq] = useState([]);

  useEffect(() => {
    axios.get('/stall/stalladminreq')
      .then((result) => {
        const dataWithIds = result.data;
        setStallsadminreq(dataWithIds);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/stall/deleteStallreq/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
    
  const showAcceptToast = () => {
    toast.success('Request accepted', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      className: 'custom-toast', // Add the custom class
    });
  };
  
 

  return (
    <div className="stall-admin-req-container">
      <div className='title'> <h1>Stall Requests</h1>
      <br/>
      <br/>
      <table className="stall-admin-req-table">
        <thead>
          <tr>
            <th>Stall Name</th>
            <th>Cuisine Type</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stallsadminreq.map((stalladminreq) => (
            <tr key={stalladminreq._id}>
              <td>{stalladminreq.sName}</td>
              <td>{stalladminreq.type}</td>
              <td>{stalladminreq.fName}</td>
              <td>{stalladminreq.lName}</td>
              <td>{stalladminreq.email}</td>
              <td>{stalladminreq.phone}</td>
              <td>
              <button className="btn btn-success" onClick={showAcceptToast}>ACCEPT</button> 
              <button className="btn btn-danger" onClick={(e) => handleDelete(stalladminreq._id)}>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  </div>
    

  );
}

export default StallAdminreq;
