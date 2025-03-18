import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BusList from './components/BusList';
import TicketBooking from './components/TicketBooking';

function App() {
  return (
    <Router>
      <div className="index">
        <h1>Buzz Buss - User Interface</h1>
        <Routes>
          <Route path="/" element={<BusList />} />
          <Route path="/book/:busId" element={<TicketBooking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
