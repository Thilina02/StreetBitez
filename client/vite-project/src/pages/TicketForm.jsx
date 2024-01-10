import React, { useState } from 'react';
import axios from 'axios';

function TicketForm({ stallOwnerId }) {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/stall/createTicket', {
        subject,
        description,
        stallOwnerId,
      });

      // Handle success (e.g., show a success message)
      console.log('Ticket created:', response.data);

      // Clear form fields
      setSubject('');
      setDescription('');
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div>
      <h3>Raise a Ticket</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button type="submit">Submit Ticket</button>
        </div>
      </form>
    </div>
  );
}

export default TicketForm;
