import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AdminNavBar from '../components/adminNavBar';
import './itemDetails.css'; // Import the CSS file for styling
import { Link, useLocation, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export default function itemDetails() {
  const { itemcode } = useParams();
  const [items, setItems] = useState([]);




  useEffect(() => {
    const fetchItem = async () => {
      try {
        console.log(itemcode);
        const { data } = await axios.get(`/invDetails/getItem${itemcode}`);
        console.log(data)
        setItems(data);





      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch item data');
      }
    };

    fetchItem();
  }, [itemcode]);
  const generateReport = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    const dateTime = `${formattedDate} ${formattedTime}`;

    const doc = new jsPDF();
    doc.text(`Item Code: ${itemcode}`, 85, 20);
    doc.text(`Report Generated On: ${dateTime}`, 15, 10);



    const tableHeaders = [['Date', 'Supplier', 'Quantity', 'Price']];
    const tableData = items.map(item => [item.date, item.supplier, item.quantity, item.price]);

    doc.autoTable({
      head: tableHeaders,
      body: tableData,
      startY: 25 // Adjust as needed
    });

    doc.save(`report_${formattedDate}.pdf`);
  }
  return (
    <div>
      <div><AdminNavBar /></div>
      <div className='details-container'>
        <div className='title'>
          <h1 className="item-details-title">Item Details</h1>
        </div>
        <div className="item-list-buttons">
          {itemcode.includes('FU') ? (
          <Link to="/itemlistFur" className="back">Back</Link>
          ):itemcode.includes('F')?(<Link to="/itemlist" className="back">Back</Link>
          ):(<Link to="/itemlistMac" className="back">Back</Link>)}
          <Link to={`/addStock/${itemcode}`} className="add-stock-button">Add Stock</Link>
          <button className="report-button" onClick={generateReport}>Generate Report</button>

        </div>
        <div className="item-details-container">
          <table className="item-details-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Supplier</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr >

                  <td>{item.date}</td>
                  <td>{item.supplier}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


