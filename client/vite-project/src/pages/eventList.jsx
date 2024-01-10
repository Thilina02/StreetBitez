import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './eventList.css';
import { Link } from 'react-router-dom';
import eventback2 from '../images/eventback2.jpg';
import html2pdf from 'html2pdf.js'; // Import html2pdf library

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEventList = async () => {
      try {
        const { data } = await axios.get('/Event/getAllEvent');
        setEvents(data.events);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch event data');
      }
    };

    fetchEventList();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      // If the search bar is empty then fetch the main list
      fetchEventList();
    } else {
      // Filter events by first name
      const filteredEvents = events.filter(
        (event) =>
          event.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setEvents(filteredEvents);
    }
  };

  const deleteEvent = async (eventId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this event?');

    if (shouldDelete) {
      try {
        await axios.delete(`/Event/deleteEvent/${eventId}`);
        const updatedEvents = events.filter((event) => event._id !== eventId);
        setEvents(updatedEvents);
        toast.success('Event deleted successfully');
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete event');
      }
    }
  };

  const generateReport = () => {
    const csvData = events.map((event) => {
      return `${event.name},${event.phonenumber},${event.email},${event.Ename},${event.Etime},${event.date},${event.Npeople},${event.theme},${event.Fneed}`;
    });

    const csvContent = `Name,PhoneNumber,Email,EventName,EventTime,Date,NoPeople,Theme,Fneed\n${csvData.join('\n')}`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'event_report.csv';
    a.click();
  };

  const generatePDF = async () => {
    try {
      const content = document.getElementById('event-list-table1');

      if (!content) {
        console.error('Element not found: event-list-table1');
        toast.error('Failed to generate PDF');
        return;
      }

      const pdfOptions = {
        margin: 10,
        filename: 'event_list.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      const pdf = await html2pdf().from(content).set(pdfOptions).outputPdf();

      const blob = new Blob([pdf], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'event_list.pdf';

      a.style.display = 'none'; // Hide the element
      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a); // Clean up after download
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate PDF');
    }
  };

  return (
    <div className="heshani-image13">
      <img src={eventback2} alt="Event" className="background-heshani13" />

      <div>
        <div className="container14">
          <div className="title">
            <h1 className="event-list-title1">Event List</h1>
          </div>

          <div className="event-list-buttons1">
            <input
              className="form-control"
              type="text"
              placeholder="Search by name or event code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div id="event-list-table1">
            <table className="event-list-table1">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>PhoneNumber</th>
                  <th>Email</th>
                  <th>EventName</th>
                  <th>EventTime</th>
                  <th>Date</th>
                  <th>NoPeople</th>
                  <th>Fneed</th>
                  <th>theme</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index}>
                    <td>{event.name}</td>
                    <td>{event.phonenumber}</td>
                    <td>{event.email}</td>
                    <td>{event.Ename}</td>
                    <td>{event.Etime}</td>
                    <td>{event.date}</td>
                    <td>{event.Npeople}</td>
                    <td>{event.theme}</td>
                    <td>{event.Fneed}</td>
                    <td>
                      <Link to={`/admin-confirm`}>
                        <button className="Edit-button">confirm</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteEvent(event._id)}
                        className="Delete-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={generateReport} className="btn btn-primary">
              Download as Excel
            </button>
            <button onClick={generatePDF} className="btn btn-primary">
              Download as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
