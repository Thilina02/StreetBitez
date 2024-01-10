// eventController

const Event = require('../models/event');

const createEvent = async (req, res) => {
  try {
    const {
      name,
      phonenumber,
      email,
      Ename,
      Etime,
      date,
      Npeople,
      theme,
      Fneed,
     
    } = req.body;

    const event = await Event.create({
      name,
      phonenumber,
      email,
      Ename,
      Etime,
      date,
      Npeople,
      theme,
      Fneed,
     
    });

    return res.status(201).json(event); // Use 201 status for successful creation
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error creating event' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { _id } = req.params; // Use _id instead of eventId
    const {
      name,
      phonenumber,
      email,
      Ename,
      Etime,
      date,
      Npeople,
      theme,
      Fneed,
     
    } = req.body;

    const event = await Event.findByIdAndUpdate(
      _id, // Use _id directly
      {
        name,
        phonenumber,
        email,
        Ename,
        Etime,
        date,
        Npeople,
        theme,
        Fneed,
      
      },
      {
        new: true,
      }
    );

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    return res.json(event);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error updating event' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { _id } = req.params; // Use _id instead of eventId
    const event = await Event.findByIdAndRemove(_id); // Use _id directly
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    return res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error deleting event' });
  }
};

const getAllEvent = async (req, res) => {
  try {
    const events = await Event.find();
    const count = events.length; // Get the count of events

    return res.json({ count, events }); // Return count along with the events
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching events' });
  }
};

const getEvent = async (req, res) => {
  try {
    const { _id } = req.params; // Use _id instead of eventId
    const event = await Event.findById(_id); // Use _id directly

    if (!event) {
      return res.status(404).json({ error: 'Event not found or invalid ID' });
    }

    return res.json(event);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Error fetching event', details: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params; // Get the event ID from the URL parameters
    const event = await Event.findById(eventId); // Use the eventId to find the event

    if (!event) {
      return res.status(404).json({ error: 'Event not found or invalid ID' });
    }

    return res.json(event);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Error fetching event', details: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  getEventById,
};
