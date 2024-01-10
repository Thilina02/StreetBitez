import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import './invEdit.css'; // Import the CSS file for styling
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function EditItemForm() {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [formData, setFormData] = useState({

   
    itemcode: '',
    name: '',
    description: '',
    reorder: '',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData)
    const{name,description,reorder,itemcode}= formData 
    const {data} =await axios.post(`/inventory/updateItem/${itemId}`,{name,description,reorder,itemcode})
    console.log('Form data submitted:', formData);
    if(formData.itemCode.includes('FU')){
      navigate('/itemlistFur');
    }else if(formData.itemCode.includes('F')){
      navigate('/itemlist');
    }else{
      navigate('/itemlistMac');
    }
    
  };

  const handleCancel = (e)=>{
    e.preventDefault();
    if(formData.itemCode.includes('FU')){
      navigate('/itemlistFur');
    }else if(formData.itemCode.includes('F')){
      navigate('/itemlist');
    }else{
      navigate('/itemlistMac');
    }
  }

  useEffect(() => {
    const fetchItem = async () => {
      try {
        console.log(itemId);
        const { data } = await axios.get(`/inventory/getItem${itemId}`);
        console.log(data)
  
         setFormData({
           
           itemCode: data.itemcode,
           name: data.name,
           description: data.description,
           reorder: data.reorder,
         });
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch item data');
      }
    };
  
    fetchItem();
  }, [itemId]);

  return (
    <div className="dihan-new-item-form-container">
  <h2>Edit Item</h2>
  <form onSubmit={handleSubmit}>
    <div className="dihan-form-group">
      <label htmlFor="itemcode">Item Code:</label>
      <input
        type="text"
        id="itemCode"
        name="itemcode"
        value={formData.itemCode}
        onChange={handleChange}
        required
        disabled={true}
      />
    </div>
    <div className="dihan-form-group">
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
    <div className="dihan-form-group">
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />
    </div>
    <div className="dihan-form-group">
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
    <button type="button" onClick={handleCancel}>Cancel</button>

    
  </form>
</div>

  );
}
