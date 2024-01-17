import React, { useState , useEffect} from 'react';
import axios from 'axios';
import './addNew.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import AdminNavBar from '../components/adminNavBar';
import { Link } from 'react-router-dom';


export default function NewItemForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({

  
    itemcode: '',
    name: '',
    description: '',
    quantity: 0,
    reorder: '',
    
  });
  useEffect(() => {
    const fetchItemList = async () => {
      try {
        const { data } = await axios.get('/inventory/fetchItemsbyCatogeryMachinery');
        console.log(data);
        var nextItemCode = "M" + (data.length + 1)
        setFormData({ ...formData, itemcode: nextItemCode })
        //setIsLoading(false);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch inventory data');
        //setIsLoading(false);
      }
    };

    fetchItemList();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData)
    const{name,description,quantity,reorder,itemcode}= formData 
    const category = 'Machinery';
    const {data} =await axios.post('./inventory/',{name,description,quantity,category,reorder,itemcode})
    console.log('Form data submitted:', formData);
    navigate(`/itemDetails/${itemcode}`);  };

  return (
    <div>
    <div><AdminNavBar /></div>
    <div className="dihan-new-item-form-container"> {/* Updated class name */}
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
      
        <div className="dihan-form-group"> {/* Updated class name */}
          <label htmlFor="itemcode">Item Code:</label>
          <input
            type="text"
            id="itemCode"
            name="itemcode"
            value={formData.itemcode}
            onChange={handleChange}
            required
            disabled={true}
          />
        </div>
        <div className="dihan-form-group"> {/* Updated class name */}
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="dihan-form-group"> {/* Updated class name */}
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="dihan-form-group"> {/* Updated class name */}
          <label htmlFor="reorder">Reorder Level:</label>
          <input
            type="number"
            id="reorder"
            name="reorder"
            value={formData.reorder}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <button><Link to="/itemlistMac">Cancel</Link></button>      
      </form>
    </div>
  </div>
  
  );
}

