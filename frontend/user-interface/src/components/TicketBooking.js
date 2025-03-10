import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function TicketBooking() {
  const { busId } = useParams();
  const [passengerName, setPassengerName] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleBooking = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/tickets/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ busId: parseInt(busId), passengerName, seatNumber })
    })
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error booking ticket:', error));
  };

  return (
    <div>
      <h2>Book Ticket for Bus {busId}</h2>
      <form onSubmit={handleBooking}>
        <div>
          <label>Passenger Name: </label>
          <input type="text" value={passengerName} onChange={(e) => setPassengerName(e.target.value)} />
        </div>
        <div>
          <label>Seat Number: </label>
          <input type="text" value={seatNumber} onChange={(e) => setSeatNumber(e.target.value)} />
        </div>
        <button type="submit">Book Ticket</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default TicketBooking;
