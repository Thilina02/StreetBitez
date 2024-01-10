import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from '../components/adminNavBar';
import { Link } from 'react-router-dom';
import './IssueEntry.css';
import Autocomplete from '../components/autocomplete';

export default function NewIssueEntry() {
const navigate = useNavigate();
const [items, setItems] = useState([]);
const [stalls, setStalls] = useState([]);
const [names, setNames] = useState([{ name: '', code: '' }]); // Initialize with an empty object or with default values if needed
const [input, setInput] = useState("");
const [formData, setFormData] = useState({
    stoleid: '',
    itemName: '',
    itemCode: '',
    date: '',
    quantity: '',
    price: '',
  });
  useEffect(() => {
    const fetchItemList = async () => {
      try {
        const { data } = await axios.get('/inventory/getallItems');
        setItems(data);
        console.log(data);
        const updatedData = data.map(item => {
          return {
            name: item.name,
            code: item.itemcode
          };
        });
        
        setNames(updatedData);
        
        //setIsLoading(false);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch inventory data');
        //setIsLoading(false);
      }
    };

    const fetchStalls = async () => {
      try {
        const { data } = await axios.get('/stall/createdStalls');
        setStalls(data);
        console.log(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch stalls data');
      }
    };

    fetchItemList();
    fetchStalls();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const setNameSub= (e) =>{

  }

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const nameElement = document.getElementById('kkk');
        const itemName = nameElement.value
        console.log(nameElement.value)
        const { date, quantity, price, itemCode ,stoleid} = formData;
        var stall = await axios.get(`./stall/getStallByStallId${stoleid}`)
        console.log(stall)
        if(stall){
          stall.data[0].isIssued = true;
          //var id = stall.data[0]._id;
          axios.post(`./stall/updateStallById${stall.data[0]._id}`);
        }
        const { data } = await axios.post('./issuedDetails/', { date, itemName, quantity, price, itemCode ,stoleid});
        console.log('Form data submitted:', formData);
        navigate(`/IssuedDetails/${stoleid}`);
    };

  return (
    <div className="issue-entry-form">
      <div><AdminNavBar /></div>
      <h2>Issue Entry Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="stoleId">Stole ID:</label>
          <select
            id="stoleId"
            name="stoleId"
            value={formData.stoleid}
            onChange={(e) => setFormData({ ...formData, stoleid: e.target.value })}
            required
          >
            <option value="">Select Stole ID</option>
            {stalls.map((stall, index) => (

                  <option value={String(stall.stallId)}>{stall.stallId}</option>
              ))}
            
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="itemName">Item Name:</label>
         
          <Autocomplete id="kkk"
        namelist={names}
        input={input} setInput={setInput}
      />
        </div>
        <div className="form-group">
          <label htmlFor="itemCode">Item Code:</label>
          <input
            type="text"
            id="itemCode"
            name="itemCode"
            value={formData.itemCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <buttonI type="submit">Submit</buttonI>
      </form>
    </div>
  );
};

