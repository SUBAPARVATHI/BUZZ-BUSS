const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Bus = require('../models/Bus');
const Ticket = require('../models/Ticket');

// JWT authentication middleware
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Update bus details (requires authentication with real-time update)
router.put('/buses/:id', authenticate, async (req, res) => {
  const { route, estimatedArrival, availableSeats, seats } = req.body;
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    if (route) bus.route = route;
    if (estimatedArrival) bus.estimatedArrival = estimatedArrival;
    if (availableSeats !== undefined) bus.availableSeats = availableSeats;
    if (seats) bus.seats = seats;
    await bus.save();

    // Emit a real-time event for bus update
    const io = req.app.get('io');
    io.emit('busUpdated', { bus });

    res.json({ message: `Bus ${bus._id} updated successfully`, bus });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all tickets for admin overview (requires authentication)
router.get('/tickets', authenticate, async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('bus');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
