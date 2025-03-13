const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  route: { type: String, required: true },
  seats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  estimatedArrival: { type: String }
});

module.exports = mongoose.model('Bus', BusSchema);
