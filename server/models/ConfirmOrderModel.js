const mongoose = require('mongoose');

const confirmedOrderSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  date: Date,  
  total: Number,
  image: String,
});

const ConfirmedOrder = mongoose.model('ConfirmedOrder', confirmedOrderSchema);

module.exports = ConfirmedOrder;
