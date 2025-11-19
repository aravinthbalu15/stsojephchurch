import cloudinary from '../config/cloudinary.js';
import FestivalImage from '../models/FestivalImage.js';
import streamifier from "streamifier";

// FAST UPLOAD (NO BASE64)
export const uploadImage = async (req, res) => {
  try {
    const file = req.file;

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "festival_gallery" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ error: "Upload failed" });
        }

        const newImage = new FestivalImage({
          url: result.secure_url,
          public_id: result.public_id,
          title: req.body.title,
        });

        await newImage.save();
        res.status(200).json(newImage);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
};


//delete
export const deleteImage = async (req, res) => {
  try {
    const image = await FestivalImage.findById(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });

    await cloudinary.uploader.destroy(image.public_id);

    await FestivalImage.findByIdAndDelete(req.params.id);

    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};

