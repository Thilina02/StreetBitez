import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AdminNavBar from '../components/adminNavBar';
import './itemlist.css'; // Import the CSS file for styling
import { Link, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function itemlist(props) {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  console.log(location)
  const category = location.state;

  useEffect(() => {
    const fetchItemList = async () => {
      try {
        const { data } = await axios.get('/inventory/fetchItemsbyCatogeryFood');
        setItems(data);
        
        // if (item.quantity <= item.reorder) {
        //   // Trigger notification
        //   toast.error(`Item '${item.name}' quantity is below reorder level!`);
        // }
        // Assuming formData is defined
        //setFormData({ ...formData, itemcode: nextItemCode });
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch inventory data');
      }
    };
  
    fetchItemList();
  }, []);
  
  const handleSearch = () => {


    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemcode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setItems(filteredItems);
  };
  const generateReport = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    const dateTime = `${formattedDate} ${formattedTime}`;

    const doc = new jsPDF();

    doc.text(`Report Generated On: ${dateTime}`, 10, 10);

    const tableHeaders = [['Item Code', 'Name', 'Quantity']];
    const tableData = items.map(item => [item.itemcode, item.name, item.quantity]);

    doc.autoTable({
      head: tableHeaders,
      body: tableData,
      startY: 20 // Adjust as needed
    });

    doc.save(`report_${formattedDate}.pdf`);
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
<div className="dihan-container">
  <div className="dihan-title">
    <h1 className="dihan-item-list-title">{category}Food Item List</h1>
  </div>

  <div className="dihan-item-list-buttons">
    <input
      type="text"
      placeholder="Search by name/itemcode..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button className="dihan-search-button" onClick={handleSearch}>Search</button>
    <Link to="/addnew" className="dihan-add-new-button">Add New</Link>
    <button className="dihan-report-button" onClick={generateReport}>Generate Report</button>
  </div>

  <div className="dihan-item-list-container">
    <table className="dihan-item-list-table">
      <thead>
        <tr>
          <th>View</th>
          <th>Item Code</th>
          <th>Name</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Reorder Level</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td><Link to={`/itemDetails/${item.itemcode}`}><button className="dihan-view-button">View</button></Link></td>
            <td>{item.itemcode}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.quantity}</td>
            <td>{item.reorder}</td>
            <td><Link to={`/invEdit/${item._id}`}>
              <button className="dihan-Edit-button">Edit</button></Link></td>
            <td>
              <button onClick={() => deleteItem(item._id)} className="dihan-Delete-button">Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


    </div>
  );
}


