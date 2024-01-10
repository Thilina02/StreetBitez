import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminTicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch all tickets for admin
    axios.get('/stall/getTicket')
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tickets:', error);
      });
  }, []);

  return (
    <div>
      <h3>Admin View - Tickets</h3>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <h4>{ticket.subject}</h4>
            <p>{ticket.description}</p>
            <p>Status: {ticket.status}</p>
            <p>Created At: {new Date(ticket.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminTicketList;
