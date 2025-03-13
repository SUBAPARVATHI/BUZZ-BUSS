const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// Get all buses
router.get('/', async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get estimated arrival time for a specific bus
router.get('/:id/arrival', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (bus) {
      res.json({ estimatedArrival: bus.estimatedArrival });
    } else {
      res.status(404).json({ message: 'Bus not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
