import OldPriest from "../models/OldPriest.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/* Upload helper */
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
      period,
    } = req.body;

    // ✅ VALIDATION (NO 500)
    if (!name_en || !name_ta || !description_en || !description_ta || !period) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "Image required" });
    }

    // ✅ SAFE ORDER LOGIC
    const last = await OldPriest.findOne().sort({ order: -1 });
    const nextOrder = last ? last.order + 1 : 1;

    const result = await uploadFromBuffer(req.file.buffer);

    const priest = await OldPriest.create({
      name: { en: name_en, ta: name_ta },
      description: { en: description_en, ta: description_ta },
      period, // ✅ MANUAL DATE FORMAT
      imageUrl: result.secure_url,
      order: nextOrder,
    });

    res.status(201).json(priest);
  } catch (err) {
    console.error("ADD OLD PRIEST ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* 📥 GET */
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
      period,
    } = req.body;

    let imageUrl;

    if (req.file?.buffer) {
      const result = await uploadFromBuffer(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const priest = await OldPriest.findByIdAndUpdate(
      req.params.id,
      {
        name: { en: name_en, ta: name_ta },
        description: { en: description_en, ta: description_ta },
        period,
        ...(imageUrl && { imageUrl }),
      },
      { new: true }
    );

    res.json(priest);
  } catch (err) {
    console.error("EDIT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
