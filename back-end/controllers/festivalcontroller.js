import cloudinary from '../config/cloudinary.js';
import FestivalImage from '../models/FestivalImage.js';

// Upload image
export const uploadImage = async (req, res) => {
  try {
    const b64 = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "festival_gallery",
    });

    const newImage = new FestivalImage({
      url: result.secure_url,
      public_id: result.public_id,
    });

    await newImage.save();
    res.status(200).json(newImage);
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};

// Get all images
export const getAllImages = async (req, res) => {
  try {
    const images = await FestivalImage.find().sort({ uploadedAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Error fetching images" });
  }
};

// Delete image
export const deleteImage = async (req, res) => {
  try {
    const image = await FestivalImage.findById(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // Delete from MongoDB
    await image.remove();
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};
