import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AdminNavBar from '../components/adminNavBar';
//import './IssuedData.css'; // Import the CSS file for styling
import { Link, useLocation,useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function itemlist(props) {
 /*  
  
  const location = useLocation();
  console.log(location)
  const category = location.state; */
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const { stoleid } = useParams();
  useEffect(() => {
    const fetchItemList = async () => {
      try {
        
            const { data } = await axios.get(`/issuedDetails/getIssuedDetails${stoleid}`);
            console.log(data)
            setItems(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch inventory data');
        //setIsLoading(false);
      }
    };

    fetchItemList();
  }, []);
  const generateReport = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    const dateTime = `${formattedDate} ${formattedTime}`;

    const doc = new jsPDF();
    doc.text(`Item Code: ${itemcode}`, 85, 20);
    doc.text(`Report Generated On: ${dateTime}`, 15, 10);



    const tableHeaders = [['Item Code', 'Name','Date', 'Quantity', 'Price']];
    const tableData = items.map(item => [item.itemCode, item.name,item.date, item.quantity, item.price]);

    doc.autoTable({
      head: tableHeaders,
      body: tableData,
      startY: 25 // Adjust as needed
    });

    doc.save(`report_${formattedDate}.pdf`);
  }
  const handleSearch = () => {


    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemcode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setItems(filteredItems);
  };
  const deleteItem = async (itemId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this item?');
    
    if (shouldDelete) {
      try {
        await axios.delete(`/inventory/deleteItem/${itemId}`);
        window.location.reload(); // Reload the page
        toast.success('Item deleted successfully');
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete item');
      }
    }
  };
  return (
    <div>
      <div><AdminNavBar /></div>
      <div className='container'>
        <div className='title'>
          <h1 className="item-list-title">Issued List</h1>
        </div>

        <div className="item-list-buttons">
          <input
            type="text"
            placeholder="Search by name/itemcode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
          <Link to="/IssueEntry" className="add-new-button">Add New</Link>
          <button className="report-button" onClick={generateReport}>Generate Report</button>

        </div>
        <div className="item-list-container">
          <table className="item-list-table">
            <thead>
              <tr>
                
                <th>Item Code</th>
                <th>Name</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Price</th>
               
              
              </tr>
            </thead>
            <tbody>
               {items.map((item, index) => (
                <tr key={index}>
                  {/* <td><Link to={`/itemDetails/${item.itemcode}`}><button className="view-button">View</button></Link></td> */}
                  <td>{item.itemCode}</td>
                  <td>{item.itemName}</td>
                  <td>{item.date}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  {/* <td><Link to={`/invEdit/${item._id}`}>
                    <button className="Edit-button">Edit</button></Link></td>
                  <td>
                    <button onClick={() => deleteItem(item._id)} className="Delete-button">Delete</button></td> */}
                </tr>
              ))} 
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


