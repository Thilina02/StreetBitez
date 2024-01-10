import React from 'react';
import { useLocation } from 'react-router-dom';
import '../pages/cart.css'

const Payment = () => {
  const location = useLocation();
  const subtotal = new URLSearchParams(location.search).get('subtotal');

  return (
    <div className='payment' >
      <h1>Payment</h1>
      <h2>Subtotal: {subtotal} /-</h2>
      {/* Add the rest of your payment components here */}
    </div>
  );
}

export default Payment;
