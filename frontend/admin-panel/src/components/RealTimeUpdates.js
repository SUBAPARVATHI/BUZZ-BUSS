import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Connect to the Socket.IO server
const socket = io('http://localhost:5000');

function RealTimeUpdates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // Listen for ticket booking events
    socket.on('ticketBooked', (data) => {
      setUpdates(prev => [
        ...prev,
        `Ticket booked: ${data.ticket._id} for Bus ${data.ticket.bus}`
      ]);
    });

    // Listen for bus update events
    socket.on('busUpdated', (data) => {
      setUpdates(prev => [
        ...prev,
        `Bus updated: ${data.bus._id} - New Route: ${data.bus.route}`
      ]);
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off('ticketBooked');
      socket.off('busUpdated');
    };
  }, []);

  return (
    <div>
      <h3>Real-Time Updates</h3>
      <ul>
        {updates.map((update, index) => (
          <li key={index}>{update}</li>
        ))}
      </ul>
    </div>
  );
}

export default RealTimeUpdates;
