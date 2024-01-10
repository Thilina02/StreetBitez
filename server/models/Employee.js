const mongoose = require('mongoose');
const {Schema} = mongoose

const EmployeeSchema = new Schema({
  name: String,
  email: {
    type:String,
    unique:true
  
  },
  idNumber: String,
  phoneNumber: Number,
  team: String,
  password: String,
  cPassword: String,
  profilePhoto:String
});

const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

module.exports = EmployeeModel;
