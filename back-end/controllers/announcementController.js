import Announcement from "../models/Announcement.js";
import cloudinary from "../config/cloudinary.js";

// Upload Base64 and return cloudinary URL
const uploadToCloudinary = async (base64, folder) => {
  const res = await cloudinary.uploader.upload(base64, {
    folder,
    resource_type: "auto",
  });
  return res.secure_url;
};

// CREATE
export const createAnnouncement = async (req, res) => {
  try {
    const { title, description, category, eventDate, expiryDate, imageBase64, pdfBase64 } = req.body;

    let imageUrl = "";
    let pdfUrl = "";

    if (imageBase64) imageUrl = await uploadToCloudinary(imageBase64, "announcements");
    if (pdfBase64) pdfUrl = await uploadToCloudinary(pdfBase64, "announcements");

    const announcement = await Announcement.create({
      title,
      description,
      category,
      eventDate,
      expiryDate,
      imageUrl,
      pdfUrl,
    });

    res.status(201).json({ success: true, data: announcement });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json({ success: true, data: announcements });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ONE
export const getAnnouncementById = async (req, res) => {
  try {
    const item = await Announcement.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not Found" });

    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE
export const updateAnnouncement = async (req, res) => {
  try {
    const { imageBase64, pdfBase64 } = req.body;

    const existing = await Announcement.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: "Not Found" });

    if (imageBase64) existing.imageUrl = await uploadToCloudinary(imageBase64, "announcements");
    if (pdfBase64) existing.pdfUrl = await uploadToCloudinary(pdfBase64, "announcements");

    Object.assign(existing, req.body);
    const updated = await existing.save();

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE
export const deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// VIEW COUNT
export const incrementViewCount = async (req, res) => {
  try {
    const item = await Announcement.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not Found" });

    item.viewCount += 1;
    await item.save();

    res.json({ success: true, viewCount: item.viewCount });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
