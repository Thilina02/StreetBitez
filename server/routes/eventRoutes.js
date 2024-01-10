// eventRoutes

const express = require('express');
const router = express.Router();
const cors = require('cors');

const {
  createEvent,
  getAllEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  getEventById,
} = require('../controllers/eventController');

// Middleware
router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

// Get all events
router.get('/getAllEvent', getAllEvent);

// Get a single event by ID
router.get('/getEvent/:_id', getEvent); // Use _id instead of eventId

// Create a new event
router.post('/createEvent', createEvent);

// Update an event
router.put('/updateEvent/:_id', updateEvent); // Use PUT for updates

// Delete an event
router.delete('/deleteEvent/:_id', deleteEvent); // Use _id instead of eventId

router.get('/getEvent/:eventId', getEventById);
module.exports = router;
