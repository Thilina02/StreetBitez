const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Colombo');
const cors = require('cors');

const { updateStallPaymentSuccess } = require('../controllers/stallPaymentSuccess');

// Middleware
router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
);

// Define the route with ID parameter
router.put('/stallPaymentSuccess/:id', (req, res) => {
  const stallID = req.params.id;
  updateStallPaymentSuccess(stallID);
});

module.exports = router;
