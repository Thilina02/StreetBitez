const OrderSuccess =require('../models/OrderModel');

const updateOrderSuccess = async (orderId) => {
  try {
    const order = await OrderSuccess.findById(orderId);
    if (order) {
      console.log(order)
      order.status = 'success';
      await order.save();
      console.log("Order data updated successfully.");
      navigate("/success"); // Replace "/success" with your desired route
    } else {
      console.log("Order not found.");
      // Handle the case where the order is not found.
    }
  } catch (error) {
    console.error(error);
    // Handle the error.
  }
};


  module.exports={
    updateOrderSuccess,
  }
  