import React, { useState } from 'react';

function BusManagement() {
  const [busId, setBusId] = useState('');
  const [route, setRoute] = useState('');
  const [message, setMessage] = useState('');

  const updateBus = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/admin/buses/${busId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ route })
    })
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error updating bus:', error));
  };

  return (
    <div>
      <h3>Bus Management</h3>
      <form onSubmit={updateBus}>
        <div>
          <label>Bus ID: </label>
          <input type="text" value={busId} onChange={(e) => setBusId(e.target.value)} />
        </div>
        <div>
          <label>New Route: </label>
          <input type="text" value={route} onChange={(e) => setRoute(e.target.value)} />
        </div>
        <button type="submit">Update Bus</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default BusManagement;
