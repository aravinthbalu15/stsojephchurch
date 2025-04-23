import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import FestivalImage from '../models/FestivalImage.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { title } = req.body;
    const b64 = req.file.buffer.toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'festival_gallery',
    });

    const newImage = new FestivalImage({
      title,
      url: result.secure_url,
      public_id: result.public_id,
    });

    await newImage.save();
    res.status(200).json(newImage);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get all images
router.get('/images', async (req, res) => {
  try {
    const images = await FestivalImage.find().sort({ uploadedAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching images' });
  }
});

// Delete image
router.delete('/:id', async (req, res) => {
  try {
    const image = await FestivalImage.findById(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });

    await cloudinary.uploader.destroy(image.public_id);
    await FestivalImage.findByIdAndDelete(req.params.id);

    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
