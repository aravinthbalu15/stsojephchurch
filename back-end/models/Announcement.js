const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: String,
  fileUrl: String,
  fileType: String,
  format: String,
  publicId: String,
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);
