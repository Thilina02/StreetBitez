import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsHeart, BsHeartFill } from 'react-icons/bs'; // Import Bootstrap Icons

function GetCreatedStall() {
  const [createdStall, setCreatedStall] = useState([]);
  const [selectedStall, setSelectedStall] = useState(null);

  useEffect(() => {
    axios.get('/stall/createdStall') // Use the correct API endpoint
      .then(result => {
        const dataWithIds = result.data;
        setCreatedStall(dataWithIds);
      })
      .catch(err => console.log(err))
  }, []);

  const handleTogglePreferredStall = (stallId) => {
    if (selectedStall === stallId) {
      // Deselect the card
      setSelectedStall(null);
    } else {
      // Select the card
      setSelectedStall(stallId);
    }
  };

  return (
    <div className="row">
      {createdStall.map((stall) => (
        <div key={stall.id} className="col-md-4 mb-4">
          <div className={`card ${selectedStall === stall.id ? 'border-danger' : ''}`}>
            <div className="card-top-right">
              {selectedStall === stall.id ? (
                <BsHeartFill
                  onClick={() => handleTogglePreferredStall(stall.id)}
                /> /* Bootstrap filled heart icon */
              ) : (
                <BsHeart
                  onClick={() => handleTogglePreferredStall(stall.id)}
                /> /* Bootstrap outline heart icon */
              )}
            </div>
            <img
              src={stall.image}
              className="card-img-top"
              alt={stall.stallName}
            />
            <div className="card-body">
              <h5 className="card-title">{stall.stallName}</h5>
              <p className="card-text">{stall.description}</p>
            </div>
            <div className="card-footer">
              <button
                className={`btn btn-primary ${selectedStall === stall.id ? 'btn-danger' : ''}`}
                onClick={() => handleTogglePreferredStall(stall.id)}
              >
                View Stall
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetCreatedStall;
