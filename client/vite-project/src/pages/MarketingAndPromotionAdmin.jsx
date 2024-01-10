import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './MarketingAndPromotionAdmin.css'; // Import your custom CSS for styling

function MarketingAndPromotionAdmin() {
  const [promotions, setPromotions] = useState([]);
  const [newPromotion, setNewPromotion] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch existing promotions when the component mounts
  useEffect(() => {
    axios.get('/stall/getPromotion')
      .then(result => {
        setPromotions(result.data);
      })
      .catch(err => console.error(err));
  }, []);

  // Handle form submission to create a new promotion
  const handleCreatePromotion = () => {
    const formData = new FormData();
    formData.append('text', newPromotion);
    formData.append('image', selectedImage);

    axios.post('/stall/createPromotion', formData)
      .then(response => {
        setPromotions([...promotions, response.data]);
        setNewPromotion('');
        setSelectedImage(null);
      })
      .catch(err => console.error(err));
  };

  const handleImageSelect = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // Render the list of promotions
  const promotionList = promotions.map((promotion) => (
    <div key={promotion.id} className="promotion-card">
      <div className="promotion-image">
        <img src={`/stallUploads/${promotion.imageURL}`} alt="Promotion" />
      </div>
      <div className="promotion-text">
        {promotion.text}
      </div>
    </div>
  ));

  return (
    <div>
      <h2>Marketing and Promotion</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter a new promotion"
          className="form-control"
          value={newPromotion}
          onChange={(e) => setNewPromotion(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={handleCreatePromotion}
        >
          Create Promotion
        </button>
      </div>
      <div className="promotion-list">
        {promotionList}
      </div>
    </div>
  );
}

export default MarketingAndPromotionAdmin;
