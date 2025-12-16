import Image from "../models/Image.js";
import cloudinary from "../config/cloudinary.js";
import stream from "stream";

/* ======================================================
   UPLOAD IMAGE
   ====================================================== */
export const uploadImage = async (req, res) => {
  try {
    const { month, title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Upload to Cloudinary using stream
    const uploadResult = await new Promise((resolve, reject) => {
      const bufferStream = new stream.PassThrough();
      bufferStream.end(req.file.buffer);

      const cloudinaryStream = cloudinary.uploader.upload_stream(
        { folder: "church-gallery" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      bufferStream.pipe(cloudinaryStream);
    });

    const image = new Image({
      month,
      title: JSON.parse(title),              // { en, ta }
      description: JSON.parse(description),  // { en, ta }
      public_id: uploadResult.public_id,
      url: uploadResult.secure_url,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
    });

    await image.save();
    res.status(201).json(image);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({
      message: "Upload failed",
      error: err.message,
    });
  }
};

/* ======================================================
   GET ALL IMAGES
   ====================================================== */
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.error("Fetch all error:", err);
    res.status(500).json({ message: "Fetch failed" });
  }
};

/* ======================================================
   GET IMAGES BY MONTH
   ====================================================== */
export const getImagesByMonth = async (req, res) => {
  try {
    const images = await Image.find({ month: req.params.month });
    res.json(images);
  } catch (err) {
    console.error("Fetch by month error:", err);
    res.status(500).json({ message: "Fetch failed" });
  }
};

/* ======================================================
   UPDATE IMAGE (TITLE + DESCRIPTION)
   ====================================================== */
export const updateImage = async (req, res) => {
  try {
    const { title, description } = req.body;

    const updated = await Image.findByIdAndUpdate(
      req.params.id,
      {
        title: JSON.parse(title),              // { en, ta }
        description: JSON.parse(description),  // { en, ta }
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

/* ======================================================
   DELETE IMAGE
   ====================================================== */
export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // Delete from MongoDB
    await image.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};
