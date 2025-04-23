import HeartConventImage from '../models/HeartConventImage.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

// Upload new image
export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path); // remove local file

    const newImage = new HeartConventImage({
      name: req.body.name,
      description: req.body.description,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all images
export const getImages = async (req, res) => {
  try {
    const images = await HeartConventImage.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete image
export const deleteImage = async (req, res) => {
  try {
    const image = await HeartConventImage.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    await cloudinary.uploader.destroy(image.cloudinaryId);
    await image.deleteOne();

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update image metadata only (not replacing image)
export const updateImage = async (req, res) => {
  try {
    const updated = await HeartConventImage.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description
    }, { new: true });

    if (!updated) return res.status(404).json({ message: 'Image not found' });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
