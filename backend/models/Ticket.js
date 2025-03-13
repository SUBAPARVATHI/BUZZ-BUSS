const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  passengerName: { type: String, required: true },
  seatNumber: { type: String, required: true },
  bookingTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', TicketSchema);
