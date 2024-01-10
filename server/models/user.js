const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  address: String,
  city: String,
  province: String,
  phonenumber: Number,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  userType: {
    type: String,
    enum: ['admin', 'customer'], 
    default: 'customer', 
  },

    securityQuestion: String,
    securityAnswer: String,
 
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
