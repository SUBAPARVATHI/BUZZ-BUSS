import React, { useEffect, useState } from 'react';

function TicketManagement() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tickets')
      .then(response => response.json())
      .then(data => setTickets(data))
      .catch(error => console.error('Error fetching tickets:', error));
  }, []);

  return (
    <div>
      <h3>Ticket Management</h3>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            Ticket {ticket.id}: {ticket.passengerName} — Bus {ticket.busId} — Seat {ticket.seatNumber}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketManagement;
