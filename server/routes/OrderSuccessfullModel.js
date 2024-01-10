const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Colombo');
const cors = require('cors');

const { updateOrderSuccess } = require('../controllers/orderPayment');

// Middleware
router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
);

// Define the route with ID parameter
router.put('/OrderSuccess/:id', (req, res) => {
  const orderId = req.params.id;
  updateOrderSuccess(orderId);
});

module.exports = router;
