import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import "./addNewEvent.css";
import eventform1 from '../images/eventform1.jpeg';


export default function AddNewEvent() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/Event/createEvent', {
        name: e.target.name.value,
        phonenumber: e.target.phonenumber.value,
        email: e.target.email.value,
        Ename: e.target.Ename.value,
        Etime: e.target.Etime.value,
        date: e.target.date.value,
        Npeople: e.target.Npeople.value,
        theme: e.target.theme.value,
        Fneed: e.target.Fneed.value,
        
      });

      console.log('Form data submitted:', data);
      toast.success('Event created successfully');
      navigate('/eventSuccess');

    } catch (error) {
      console.error('Error submitting form data:', error);
      toast.error('Failed to create event');
    }
  };

  return (

    


      <div className="Heshani1">
        <img src={eventform1} alt="Event" className="Heshani-image9" />
     
    <div className="Heshanicontainer9">
      <form onSubmit={handleSubmit}>
        
        <div className="form-heshani">
        <h1>EVENT PROPOSAL FORM</h1>
          <label htmlFor="name">Name:</label>
          <input
            className="form-control"
            id="name"
            name="name"
            required
          />
        </div>

        <div className="form-heshani">
          <label htmlFor="phonenumber">Phone Number:</label>
          <input
            className="form-control"
            type="tel"
            id="phonenumber"
            name="phonenumber"
            required
          />
        </div>

        <div className="form-heshani">
          <label htmlFor="email">Email:</label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            required
          />
        </div>

        <div className="form-heshani">
          <label htmlFor="Ename">Event Name:</label>
          <select
            className="form-control"
            id="Ename"
            name="Ename"
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

        <div className="form-heshani">
          <label htmlFor="Etime">Event Time:</label>
          <select
            className="form-control"
            id="Etime"
            name="Etime"
            required
          >
            <option value="">Select</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>

        <div className="form-heshani">
          <label htmlFor="date">Event Date:</label>
          <input
            className="form-control"
            type="date"
            id="date"
            name="date"
            required
          />
        </div>

        <div className="form-heshani">
          <label htmlFor="Npeople">No of People Expected:</label>
          <select
            className="form-control"
            id="Npeople"
            name="Npeople"
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

        <div className="form-heshani">
          <label htmlFor="theme">Theme Of The Event:</label>
          <select
            className="form-control"
            id="theme"
            name="theme"
            required
          >
            <option value="">Select</option>
          <option value="Color">Color Base</option>
          <option value="Luxury">Luxury Base</option>
          <option value="Normal">Normal Base</option>
          
        </select>
        </div>

        <div className="form-heshani">
        <label>Facilities Needed:</label>
        <select
            className="form-control"
            id="Fneed"
            name="Fneed"
            required
          >
            <option value="">Select</option>
            <option value="chairs">chairs</option>
            <option value="liqours">liqours</option>
            <option value="lighting">lighting</option>
            <option value="food">food</option>
            
          </select>
        </div>



        <buttonheshani 
        type="submit" className="btn btn-primary">
          Submit
        </buttonheshani>
      </form>
    </div>
    </div>
    
  );
}
