import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from '../components/CartItem';
import { Link} from 'react-router-dom';
import '../pages/cart.css'
import { useNavigate, useParams } from "react-router-dom";
import NavBar from '../components/cartNavbar';
import Footer from '../components/Footer'



const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
 

  useEffect(() => {
    axios.get('http://localhost:8000/cart/get-cart')
      .then(response => {
        setCartItems(response.data);
        calculateSubtotal(response.data); 
        alert// Calculate initial subtotal
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    calculateSubtotal(cartItems); // Calculate initial subtotal
  }, [cartItems]); // Watch for changes in cartItems

  const calculateSubtotal = (items) => {
    const newSubtotal = items.reduce((total, item) => total + item.total, 0);
    setSubtotal(newSubtotal);
  }
  const handleUpdateTotal = (updatedTotal) => {
    setSubtotal(prevSubtotal => prevSubtotal + updatedTotal);
  }

  const handleDelete = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
  }

  //for cancle button

  const handleCancel = () => {
    axios.delete('http://localhost:8000/cart/delete-all-items')
      .then(response => {
        setCartItems([]);
        setSubtotal(0);
        history.goBack();
      })
      .catch(error => {
        console.error(error);
      });
  }

 // ... (existing code)

const handleConfirmOrder = () => {
  axios.put('http://localhost:8000/order/confirm-order', {
    status: 'confirmed'
  })
  .then(response => {
    console.log(response.data.message);
  })
  .catch(error => {
    console.error(error);
  });
}



  

  return (
    <div className=''  >
      <NavBar/>
      <div className='cartTotal'>
        <h1 className='mycart'>MY CART</h1>
        <div className='col-md-2 '>
          <div>
            <h2 style={{ fontSize: '45px' }}>SubTotal: {subtotal} Rs/-</h2>
          </div>


            <button className="continue"  onClick={() => navigate(`/ReceiptForOrder/${cartItems._id}`)} >Confirm</button>
         

          <button className='cancle' onClick={handleCancel}>Cancle</button>
        </div>

      </div>

      <div className='cartitem'>
        <ul>
          {cartItems.map(item => (
            <CartItem key={item._id} item={item} onDelete={handleDelete} onUpdateTotal={handleUpdateTotal} />
          ))}
        </ul>


      </div>

     
    </div>

  );
};

export default CartItems;
