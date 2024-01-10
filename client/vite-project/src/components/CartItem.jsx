import React, { useState } from "react";
import axios from 'axios';
import '../pages/cart.css'
import '../pages/cartbg.css'



const CartItem = ({ item, onDelete, onUpdateTotal }) => { 
  
  const [quantity, setQuantity] = useState(item.quantity);
  const [total, setTotal] = useState(item.total);
 
  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantityInDatabase(newQuantity);
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantityInDatabase(newQuantity);
    }
    else{
      
        axios.delete(`http://localhost:8000/cart/delete-item/${item._id}`)
          .then(response => {
            onDelete(item._id);
            onUpdateTotal(-item.total);
          })
          .catch(error => {
            console.error(error);
          });
      
    }
  }

  

  const updateQuantityInDatabase = (newQuantity) => {
    const newTotal = item.price * newQuantity;
    setTotal(newTotal);

    axios.put(`http://localhost:8000/cart/update-quantity/${item._id}`, { quantity: newQuantity, total: newTotal })
      .then(response => {
        onUpdateTotal(newTotal - item.total);
      })
      .catch(error => {
        console.error(error);
      });
  }


  const deleteItem = () => {
    axios.delete(`http://localhost:8000/cart/delete-item/${item._id}`)
      .then(response => {
        onDelete(item._id);
        onUpdateTotal(-item.total);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className=""  >
    <div className=" cart-container row justify-content-center mt-5 shadow-lg p-3 mb-5 bg-white rounded ">

       <div className="col-md-15">
           
           <div className="flex-container">

            <div className='text-left m-3 w-100'>
               <h2 className='text-left'>{item.name}</h2>
               <h2 className="text-left">Price: {total} Rs/-</h2>
               <h2 style={{display:'inline'}}>Quantity :</h2>
               <button className="fa fa-plus" onClick={increaseQuantity} ></button>
               <b>{quantity}</b>
               <button className="fa fa-minus" onClick={decreaseQuantity}></button>
             

            </div>

            <div className=''>
         <img src={item.image} style={{height:'100px' , width: '150px',marginTop:'20px'}} alt={item.name} />
       </div>

       <div className=''>
         <button className='fa fa-trash mt-5' aria-hidden="true" onClick={deleteItem} />
       </div>

           </div>
       </div>

       <div className="col-md-4">

</div>


    </div>
 
</div>
  );
};

export default CartItem;
