// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Image = require('../models/Image');
const stream = require('stream');
const upload = multer(); // memory storage for buffering

// Upload image
router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    const { month, title, description } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No image file provided' });

    const result = await new Promise((resolve, reject) => {
      const bufferStream = new stream.PassThrough();
      bufferStream.end(req.file.buffer);
      const cloudinaryStream = cloudinary.uploader.upload_stream(
        { folder: 'church-gallery' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      bufferStream.pipe(cloudinaryStream);
    });

    const newImage = new Image({
      month,
      title,
      description,
      public_id: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format
    });

    await newImage.save();
    res.status(201).json({ message: 'Image uploaded successfully', image: newImage });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// Get all images
router.get('/', async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch images', error: error.message });
  }
});

// Delete image
router.delete('/delete-image/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    await cloudinary.uploader.destroy(image.public_id);
    await Image.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
});

// Get images by month
router.get('/:month', async (req, res) => {
  try {
    const { month } = req.params;
    const images = await Image.find({ month });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error: error.message });
  }
});

module.exports = router;
