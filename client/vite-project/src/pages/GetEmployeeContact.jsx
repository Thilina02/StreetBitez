
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Assuming you have toast imported
import AdminNavBar from '../components/adminNavBar';

// Import your CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

function GetEmployeeContact() {
  const [employeeContact, setEmployeeContact] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getEmployeeContact = async () => {
      try {
        const { data } = await axios.get('/employee/getEmployeeContact');
        setEmployeeContact(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch employee data');
      }
    };

    getEmployeeContact();
  }, []);

  const deleteEmployeeContact = async (contactId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this item?');

    if (shouldDelete) {
      try {
        await axios.delete(`/employee/deleteEmployeeContact/${contactId}`);
        toast.success('Item deleted successfully');
        setEmployeeContact(prevEmployeeContacts => prevEmployeeContacts.filter(contact => contact._id !== contactId));
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete item');
      }
    }
  };
  const filteredContacts = employeeContact.filter((emp) =>
  emp.email.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div>
      <div><AdminNavBar /></div>
      <div className='container'>
        <div className='title'>
          <h1 className="item-list-title">Employee Contact</h1>
        </div>
        <div className='item-list-buttons'>
          <input
            type='text'
            placeholder='Search by Team...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
          
        <div className="item-list-container">
          <table className="item-list-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Description</th>
                <th>Action</th>
                
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.email}</td>
                  <td>{contact.description}</td>
                 
                  <td>
                    
                    <button className='btn btn-danger' onClick={() => deleteEmployeeContact(contact._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    
  );
}

export default GetEmployeeContact;


