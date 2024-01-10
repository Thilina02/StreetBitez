const mongoose = require('mongoose');
const { Schema } = mongoose;

const stallRegisterSchema = new Schema({
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
    default: '40000 LKR', // Set the default value here
  },
  isIssued: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed','success'], 
    default: 'pending' 
  }
});

const stallRegisterModel = mongoose.model('StallReg', stallRegisterSchema);
module.exports = stallRegisterModel;