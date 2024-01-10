import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavBar from '../components/adminNavBar';
import './customerDetails.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Calendar } from 'react-calendar';
import '../pages/orderAdmin.css'
import Reactdatepicker from '../components/Reactdatepicker';
import DatePicker from '../components/DatePicker'; 
import jsPDF from 'jspdf';


export default function orderAdmin() {
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  

  const handleDateSubmit = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    axios.get(`http://localhost:8000/order/confirmed-orders/${formattedDate}`)
      .then((response) => {
        setConfirmedOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching confirmed orders:', error);
      });
  };
  
  
  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Fetch orders for the selected date within the selected month
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const day = date.getDate();

    axios.get(`http://localhost:8000/order/confirmed-orders/${year}/${month}/${day}`)
      .then((response) => {
        setConfirmedOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching confirmed orders:', error);
      });
  };

  useEffect(() => {
    // Fetch orders for today within the selected month on initial load
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are 0-indexed
    const day = today.getDate();

    axios.get(`http://localhost:8000/order/confirmed-orders/${year}/${month}/${day}`)
      .then((response) => {
        setConfirmedOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching confirmed orders:', error);
      });
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Order Details', 10, 10);
  
    // Generate PDF content here
    confirmedOrders.forEach((order, index) => {
      const yOffset = 20 + (index * 10); // Adjust vertical spacing as needed
      doc.text(`Order ID: ${index + 1}`, 10, yOffset);
      doc.text(`Item Name: ${order.name}`, 30, yOffset);
      doc.text(`Price: ${order.price}`, 60, yOffset);
      doc.text(`Quantity: ${order.quantity}`, 90, yOffset);
      doc.text(`Total Price: ${order.total}`, 120, yOffset);
      doc.text(`Ordered Date: ${order.date}`, 150, yOffset);
    });
  
    doc.save('order_details.pdf');
  };
  
  const handleMonthChange = (date) => {

    console.log('handleMonthChange called with date:', date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed
  
    // Fetch orders for the entire selected month
    axios.get(`http://localhost:8000/order/confirmed-orders/${year}/${month}`)
      .then((response) => {
        setConfirmedOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching confirmed orders:', error);
      });
  };
  
  
  return (
    <div className='date-container'>
      <div><AdminNavBar/></div>

    
    
    
      
      <div className="customer-details-container centered-table">
        <br></br>
        <br></br>
        <h1 className='odetails'>
          <FontAwesomeIcon icon={faUsers} /> Order Details
        </h1>
        <Reactdatepicker date={selectedDate} onDateChange={handleDateChange} onMonthChange={handleMonthChange} />
        <br></br>
       
       
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Item Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col"> Ordered Date</th>
                
              </tr>
            </thead>
            <tbody>
  {confirmedOrders.map((order, index) => (
    <tr key={order._id}>
      <th scope="row">{index + 1}</th>
      <td>{order.name}</td>
      <td>{order.price}</td>
      <td>{order.quantity}</td>
      <td>{order.total}</td>
      <td>{order.date}</td>
    </tr>
  ))}
</tbody>
          </table>
       
        <button className="print-button" onClick={generatePDF}>
  Generate PDF
</button>
      </div>
      </div>

    
      
  )
}
