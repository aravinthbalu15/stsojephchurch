// controllers/oldPriestController.js
import OldPriest from "../models/OldPriest.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/* 📌 Upload helper */
const uploadFromBuffer = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "oldpriests" },
      (error, result) => (result ? resolve(result) : reject(error))
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

/* ➕ ADD */
export const addOldPriest = async (req, res) => {
  try {
    const {
      name_en,
      name_ta,
      description_en,
      description_ta,
      dob_start,
      dob_end,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const count = await OldPriest.countDocuments();
    const result = await uploadFromBuffer(req.file.buffer);

    const priest = await OldPriest.create({
      name: { en: name_en, ta: name_ta },
      description: { en: description_en, ta: description_ta },
      dob_start,
      dob_end,
      imageUrl: result.secure_url,
      order: count + 1,
    });

    res.status(201).json(priest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* 📥 GET ALL (ORDERED) */
export const getAllOldPriests = async (req, res) => {
  try {
    const priests = await OldPriest.find().sort({ order: 1 });
    res.json(priests);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* ❌ DELETE */
export const deleteOldPriest = async (req, res) => {
  try {
    await OldPriest.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* ✏️ UPDATE */
export const editOldPriest = async (req, res) => {
  try {
    const {
      name_en,
      name_ta,
      description_en,
      description_ta,
      dob_start,
      dob_end,
    } = req.body;

    let imageUrl;

    if (req.file) {
      const result = await uploadFromBuffer(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const priest = await OldPriest.findByIdAndUpdate(
      req.params.id,
      {
        name: { en: name_en, ta: name_ta },
        description: { en: description_en, ta: description_ta },
        dob_start,
        dob_end,
        ...(imageUrl && { imageUrl }),
      },
      { new: true }
    );

    res.json(priest);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
