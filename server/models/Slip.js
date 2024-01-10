const mongoose = require('mongoose');

const slipSchema = new mongoose.Schema({
  slipPath: String,
});

module.exports = mongoose.model('Slip', slipSchema);
