const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Bus = require('../models/Bus');

// Book a ticket (ticket automation with real-time update)
router.post('/book', async (req, res) => {
  const { busId, passengerName, seatNumber } = req.body;
  if (!busId || !passengerName || !seatNumber) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    if (bus.availableSeats <= 0) return res.status(400).json({ message: 'No available seats' });

    const ticket = await Ticket.create({ bus: busId, passengerName, seatNumber });
    // Decrement available seats
    bus.availableSeats -= 1;
    await bus.save();

    // Emit a real-time event for ticket booking
    const io = req.app.get('io');
    io.emit('ticketBooked', { ticket });

    res.json({ message: 'Ticket booked successfully', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all tickets (for admin/user view)
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('bus');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
