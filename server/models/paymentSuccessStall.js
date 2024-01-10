const mongoose = require('mongoose')
const {Schema} = mongoose


const paymentSuccess = new Schema({
    stallName: String,
    type: String,
    amount: String,
    mType: String,
    stallId: String,
    fName: String,
    lName: String,
    phonenumber: Number,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    payment: {
      type: String,
      default: 'Success', // Set the default value here
    },
      
     
})

const successModel = mongoose.model('Payment', paymentSuccess)
module.exports = successModel;