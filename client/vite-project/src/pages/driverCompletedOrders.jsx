import React, { useState, useEffect } from 'react';
import './driverCompletedOrder.css';

function CompletedOrders() {
  const [searchUsername, setSearchUsername] = useState('');
  const [orders, setOrders] = useState([]); // Initialize with your orders data

  // Function to handle username search
  const handleUsernameSearch = (username) => {
    setSearchUsername(username);
  };

  // Replace the following sample data with your actual order data
  const sampleOrders = [
    {
      username: 'Anne Perera',
      // Other order details...
    },
    {
      username: 'Priyan Perera',
        // Other order details...
    },

    {
      username: 'Dinal Perera',
        // Other order details...
    },

    {
      username: 'Weliwala Perera',
        // Other order details...
    },

    {
      username: ' Perera',
        // Other order details...
    },

    {
      username: 'John Doe',
      // Other order details...
    },

    {
      username: 'Jenny De Silva',
    },

    {
      username: 'Sam Silva',
    },
    
    {
      username: 'Kenzy Fernando',
    }
  ];

  // Initialize orders with sample data
  useEffect(() => {
    setOrders(sampleOrders);
  }, []);

  // Filter orders based on the searchUsername
  const filteredOrders = orders.filter((order) =>
    order.username.toLowerCase().includes(searchUsername.toLowerCase())
  );

  return (
    <div className="cpmOrd-container">
      <header>
        <h1>Your Completed Orders</h1>
      </header>

      <div className="driver-search-bar">
        <input
          type="text"
          placeholder="Search by username"
          value={searchUsername}
          onChange={(e) => handleUsernameSearch(e.target.value)}
        />
      </div>

      <div className="cpmOrd-card-wrapper">
        {filteredOrders.map((order, index) => (
          <div className="cpmOrd-card" key={index}>
            <div className="cpmOrd-card__content">
              <p>Accepted</p>
              <p>#posxxx</p>
              <p>{order.username}</p>
              <p>55/B, Riverface Road, Colombo 09</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompletedOrders;
