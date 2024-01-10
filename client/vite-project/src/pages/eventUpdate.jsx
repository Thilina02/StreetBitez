import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import "./eventUpdate.css";
import eventform1 from '../images/eventform1.jpeg';

export default function EventUpdate() {
  const navigate = useNavigate();
  const { eventId } = useParams(); // Get the eventId from the URL

  const [eventData, setEventData] = useState({
    name: '',
    phonenumber: '',
    email: '',
    Ename: '',
    Etime: '',
    date: '',
    Npeople: '',
    theme: '',
    Fneed: '',
  
  });

  useEffect(() => {
    // Fetch the event data for the specified eventId
    const fetchEventData = async () => {
      try {
        const { data } = await axios.get(`/Event/getEvent/${eventId}`);
        setEventData(data); // Assuming the response contains the event data directly
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch event data');
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`/Event/updateEvent/${eventId}`, eventData);
      console.log('Form data updated:', data);
      toast.success('Event updated successfully');
      navigate('/eventListUser'); // Navigate back to the event list after updating
    } catch (error) {
      console.error('Error updating form data:', error);
      toast.error('Failed to update event');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  return (
    <div className="Heshani2">
    <img src={eventform1} alt="Event" className="Heshani-image91" />
 
    <div className="Heshanicontainer91">
      <form onSubmit={handleSubmit}>
     
        <div className="form-heshani">
        <h1>Update Event</h1>
          <label htmlFor="name">Name:</label>
          <input
            className="form-control"
            id="name"
            name="name"
            value={eventData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phonenumber">Phone Number:</label>
          <input
            className="form-control"
            id="phonenumber"
            name="phonenumber"
            value={eventData.phonenumber}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className="form-control"
            id="email"
            name="email"
            value={eventData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Ename">Event Name:</label>
          <select
            className="form-control"
            id="Ename"
            name="Ename"
            value={eventData.Ename}
            onChange={handleInputChange}
            required
          >
              <option value="">Select</option>
            <option value="Birthday">Birthday</option>
            <option value="Wedding">BrideToBe Party</option>
            <option value="GetTogether">GetTogether</option>
            <option value="FreeEvent">FreeEvent</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Etime">Event Time:</label>
          <select
            className="form-control"
            id="Etime"
            name="Etime"
            value={eventData.Etime}
            onChange={handleInputChange}
            required
          >
          <option value="">Select</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Event Date:</label>
          <input
            className="form-control"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Npeople">No of People Expected:</label>
          <select
            className="form-control"
            id="Npeople"
            name="Npeople"
            value={eventData.Npeople}
            onChange={handleInputChange}
            required
          >
              <option value="">Select</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
            <option value="200">200</option>
            <option value="250">250</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="theme">Theme Of The Event:</label>
          <select
            className="form-control"
            id="theme"
            name="theme"
            value={eventData.theme}
            onChange={handleInputChange}
            required
          ><option value="">Select</option>
          <option value="Color">Color Base</option>
          <option value="Luxury">Luxury Base</option>
          <option value="Normal">Normal Base</option>
          
        </select>
        </div>
        <div className="form-group">
          <label htmlFor="Fneed">Facilities Needed:</label>
          <select
            className="form-control"
            id="Fneed"
            name="Fneed"
            value={eventData.Fneed}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="chairs">chairs</option>
            <option value="liqours">liqours</option>
            <option value="lighting">lighting</option>
            <option value="food">food</option>
            
          </select>
        </div>
       

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div></div>
  );
}
