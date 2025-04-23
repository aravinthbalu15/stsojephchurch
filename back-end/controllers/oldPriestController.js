import OldPriest from "../models/OldPriest.js";
import cloudinary from "../config/cloudinary.js";  // Assuming cloudinary is configured properly

import streamifier from "streamifier";

// Add a new priest
const addOldPriest = async (req, res) => {
  try {
    const { name, description, dob_start, dob_end } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload image buffer to Cloudinary using upload_stream
    const uploadFromBuffer = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "oldpriests",
            resource_type: "image",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await uploadFromBuffer();

    // Save data to MongoDB
    const newPriest = new OldPriest({
      name,
      description,
      dob_start,
      dob_end,
      imageUrl: result.secure_url,
    });

    await newPriest.save();
    res.status(201).json(newPriest);
  } catch (error) {
    console.error("Add priest error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Other controller methods for get, delete, edit would remain the same


// Get all priests
const getAllOldPriests = async (req, res) => {
  try {
    const priests = await OldPriest.find();
    res.json(priests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a priest
const deleteOldPriest = async (req, res) => {
  try {
    const priest = await OldPriest.findByIdAndDelete(req.params.id);
    if (!priest) return res.status(404).json({ message: "Priest not found" });
    res.status(200).json({ message: "Priest deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit an existing priest
const editOldPriest = async (req, res) => {
  try {
    const { name, description, dob_start, dob_end } = req.body;

    // Check if a new image is uploaded
    let imageUrl = req.body.imageUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.buffer, {
        folder: "oldpriests",
        resource_type: "auto",
      });
      imageUrl = result.secure_url;
    }

    const priest = await OldPriest.findByIdAndUpdate(
      req.params.id,
      { name, description, dob_start, dob_end, imageUrl },
      { new: true }
    );

    if (!priest) return res.status(404).json({ message: "Priest not found" });

    res.status(200).json(priest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addOldPriest, getAllOldPriests, deleteOldPriest, editOldPriest };
