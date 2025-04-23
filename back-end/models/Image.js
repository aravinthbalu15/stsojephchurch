const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  month: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  public_id: { type: String, required: true },
  url: { type: String, required: true },
  width: Number,
  height: Number,
  format: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Image', imageSchema);
