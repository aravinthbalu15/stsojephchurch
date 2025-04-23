const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  secure_url: { type: String, required: true }, // The URL of the uploaded video
  cloudinary_id: { type: String, required: true }, // Cloudinary ID for deletion
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
