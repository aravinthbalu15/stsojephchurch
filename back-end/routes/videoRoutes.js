const express = require('express');
const router = express.Router();
const multer = require('multer');
const stream = require('stream');
const cloudinary = require('../config/cloudinary');
const Video = require('../models/Video'); // Assuming Video is the model for storing video data

const upload = multer(); // Set multer for handling file uploads


// GET all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error('Error fetching videos:', err);
    res.status(500).send('Server error');
  }
});

// Video upload route
router.post('/upload-video', upload.single('video'), async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.file || !title) {
      return res.status(400).json({ message: 'Video file and title are required' });
    }

    // Convert the video buffer to a stream
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);

    // Upload video to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const cloudinaryStream = cloudinary.uploader.upload_stream(
        { resource_type: 'video', folder: 'church-gallery/videos' }, 
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      bufferStream.pipe(cloudinaryStream);
    });

    // Save video metadata to MongoDB
    const newVideo = new Video({
      title,
      secure_url: result.secure_url,
      cloudinary_id: result.public_id,
    });

    await newVideo.save();

    res.status(201).json({ message: '✅ Video uploaded successfully', video: newVideo });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: '❌ Upload failed', error: err.message });
  }
});

// Server-side DELETE route for deleting a video
router.delete('/delete-video/:id', async (req, res) => {
  try {
    console.log('⛔ Deleting video with ID:', req.params.id);
    const video = await Video.findById(req.params.id);
    if (!video) {
      console.log('❌ Video not found in DB');
      return res.status(404).json({ message: 'Video not found' });
    }

    console.log('🌐 Deleting from Cloudinary:', video.cloudinary_id);
    await cloudinary.uploader.destroy(video.cloudinary_id, { resource_type: 'video' });

    console.log('🗑️ Deleting from MongoDB');
    await Video.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: '✅ Video deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting video:', err);
    res.status(500).json({ message: '❌ Error deleting video', error: err.message });
  }
});



// Export the router
module.exports = router;
