import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BusList() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/buses')
      .then(response => response.json())
      .then(data => setBuses(data))
      .catch(error => console.error('Error fetching buses:', error));
  }, []);

  return (
    <div>
      <h2>Available Buses</h2>
      <ul>
        {buses.map(bus => (
          <li key={bus.id}>
            {bus.route} — Available Seats: {bus.availableSeats} — ETA: {bus.estimatedArrival}
            {' '}
            <Link to={`/book/${bus.id}`}>Book Now</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BusList;
