const express = require('express');
const router = express.Router();

// In-memory ticket storage for demonstration purposes
let tickets = [];

// Book a ticket (ticket automation)
router.post('/book', (req, res) => {
  const { busId, passengerName, seatNumber } = req.body;
  if (!busId || !passengerName || !seatNumber) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const ticket = {
    id: tickets.length + 1,
    busId,
    passengerName,
    seatNumber,
    bookingTime: new Date(),
  };
  tickets.push(ticket);
  res.json({ message: 'Ticket booked successfully', ticket });
});

// Get all tickets (this could be extended to return tickets for a specific user)
router.get('/', (req, res) => {
  res.json(tickets);
});

module.exports = router;
