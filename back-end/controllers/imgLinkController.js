// controllers/imgLinkController.js
import ImgLink from '../models/imgLinkModel.js';
import cloudinary from '../config/cloudinary.js';

// Upload new image
export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const image = await ImgLink.create({
      title: req.body.title,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

// Get all images
export const getImages = async (req, res) => {
  try {
    const images = await ImgLink.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching images', error: err.message });
  }
};

// Update image (title or replace image)
export const updateImage = async (req, res) => {
  try {
    const image = await ImgLink.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    // If a new image is uploaded, delete old and upload new
    if (req.file) {
      await cloudinary.uploader.destroy(image.cloudinaryId);
      const result = await cloudinary.uploader.upload(req.file.path);
      image.imageUrl = result.secure_url;
      image.cloudinaryId = result.public_id;
    }

    if (req.body.title) image.title = req.body.title;
    await image.save();
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const img = await ImgLink.findById(req.params.id); // ✅ corrected here
    if (!img) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Delete image from Cloudinary using stored public_id
    await cloudinary.uploader.destroy(img.cloudinaryId); // ✅ use saved public_id

    // Delete from MongoDB
    await ImgLink.findByIdAndDelete(req.params.id); // ✅ corrected here

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error during deletion" });
  }
};
