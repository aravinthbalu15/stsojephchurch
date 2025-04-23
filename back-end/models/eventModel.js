// server/models/eventModel.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // 🆕 ADD THIS
  image: { type: String, required: true },
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
