const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const Announcement = require('../models/Announcement');
const upload = require('../middleware/upload');

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload Route
router.post('/announcements', upload.single('file'), async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const streamUpload = (fileBuffer, fileType) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: fileType === 'application/pdf' ? 'raw' : 'auto',
            folder: 'announcements',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(fileBuffer);
      });
    };

    const result = await streamUpload(file.buffer, file.mimetype);

    const newAnnouncement = new Announcement({
      title,
      fileUrl: result.secure_url,
      fileType: result.resource_type,
      format: result.format,
      publicId: result.public_id,
    });

    const saved = await newAnnouncement.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

// Get All Announcements
router.get('/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
});

// Delete Announcement
router.delete('/announcements/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: 'Not found' });

    if (announcement.publicId) {
      await cloudinary.uploader.destroy(announcement.publicId, {
        resource_type: announcement.fileType,
      });
    }

    await announcement.deleteOne();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Deletion failed', error: err.message });
  }
});

module.exports = router;
