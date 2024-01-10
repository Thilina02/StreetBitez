const mongoose = require('mongoose');
const {Schema} = mongoose

const stallPromotionsSchema = new Schema({
    text: String,
    imageURL: String,
  });

const stallPromotionsModel = mongoose.model('stallPromo', stallPromotionsSchema);
module.exports = stallPromotionsModel;