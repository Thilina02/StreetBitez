const stallRegisterModel =require('../models/stallRegister');

const updateStallPaymentSuccess = async (stallID) => {
  try {
    const stall = await stallRegisterModel.findById(stallID);
    if (stall) {
      console.log(stall);
      stall.status = 'success';
      await stall.save();
      console.log("stall data updated successfully.");
      //navigate("/success"); // Replace "/success" with your desired route
    } else {
      console.log("stall not found.");
      // Handle the case where the stall is not found.
    }
  } catch (error) {
    console.error(error);
    // Handle the error.
  }
};
  module.exports={
    updateStallPaymentSuccess,
  }
  