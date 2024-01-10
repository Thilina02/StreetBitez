import React, { useState } from 'react';
import axios from 'axios';
import './addStock.css';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNavBar from '../components/adminNavBar';
import { Link } from 'react-router-dom';

export default function NewItemForm() {
  const navigate = useNavigate();
  const { itemcode } = useParams();
  const [formData, setFormData] = useState({
    date: '',
    supplier: '',
    quantity: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const { date, supplier, quantity, price } = formData;
    const { data } = await axios.post('./invDetails/', { date, supplier, quantity, price, itemcode });
    console.log('Form data submitted:', formData);
    navigate(`/itemDetails/${itemcode}`);
  };

  const isQuantityValid = () => {
    return formData.quantity >= 0;
  };

  return (
    <div>
  <AdminNavBar />
  <div className="dihan-add-stock-container"> {/* Updated class name */}
    <h2>Add Stock</h2>
    <form onSubmit={handleSubmit}>
      <div className="dihan-form-group"> {/* Updated class name */}
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="dihan-form-group"> {/* Updated class name */}
        <label htmlFor="supplier">Supplier:</label>
        <input
          type="text"
          id="supplier"
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
          required
        />
      </div>
      <div className="dihan-form-group"> {/* Updated class name */}
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>
      <div className="dihan-form-group"> {/* Updated class name */}
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={!isQuantityValid()}>
        Submit
      </button>
      <button>
        <Link to={`/itemDetails/${itemcode}`}>Cancel</Link>
      </button>
    </form>
  </div>
</div>

  );
}
