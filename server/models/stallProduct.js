const mongoose = require('mongoose');
const {Schema} = mongoose

const stallProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },  
  image: { type: String, required: true },
});

const stallProductModel = mongoose.model('stallProduct', stallProductSchema);
module.exports = stallProductModel;