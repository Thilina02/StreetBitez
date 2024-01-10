const mongoose = require('mongoose');

const SuccessorderSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  date: Date,
  status: {
    type: String,
    enum: ['pending', 'success'], 
    default: 'success' 
  }
});

const SuccessfullOrder = mongoose.model('SuccessfullOrder', SuccessorderSchema);

module.exports = SuccessfullOrder;


