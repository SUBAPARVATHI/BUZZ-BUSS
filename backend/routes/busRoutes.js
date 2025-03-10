const express = require('express');
const router = express.Router();

// Sample bus data (in a production app this would come from a database)
let buses = [
  { id: 1, route: 'City A to City B', seats: 40, availableSeats: 20, estimatedArrival: '15 mins' },
  { id: 2, route: 'City B to City C', seats: 30, availableSeats: 5, estimatedArrival: '10 mins' },
];

// Get all buses
router.get('/', (req, res) => {
  res.json(buses);
});

// Get estimated arrival time for a specific bus
router.get('/:id/arrival', (req, res) => {
  const busId = parseInt(req.params.id);
  const bus = buses.find(b => b.id === busId);
  if (bus) {
    // In a real scenario, ETA might be calculated based on current location data.
    res.json({ estimatedArrival: bus.estimatedArrival });
  } else {
    res.status(404).json({ message: 'Bus not found' });
  }
});

module.exports = router;
