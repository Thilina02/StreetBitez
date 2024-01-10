// models/ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  subject: String,
  description: String,
  status: String, // e.g., 'Open', 'In Progress', 'Closed'
  createdAt: { type: Date, default: Date.now },
  stallOwnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'StallRegister' },
});

module.exports = mongoose.model('Ticket', ticketSchema);