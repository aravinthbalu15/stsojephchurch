import Event from "../models/eventModel.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// Upload Event
export const uploadEvent = async (req, res) => {
  try {
    let uploadedImage = null;

    if (req.file) {
      uploadedImage = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "events" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
    }

    const newEvent = new Event({
      description_en: req.body.description_en,
      description_ta: req.body.description_ta,
      category: req.body.category,
      image: uploadedImage ? uploadedImage.secure_url : "",
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: "Event upload failed", error });
  }
};

// Get All Events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({ message: "Unable to fetch events", error });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  try {
    let imageUrl = req.body.image;

    if (req.file) {
      const upload = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "events" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
      imageUrl = upload.secure_url;
    }

    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      {
        description_en: req.body.description_en,
        description_ta: req.body.description_ta,
        category: req.body.category,
        image: imageUrl,
      },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Event update failed", error });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: "Event deletion failed", error });
  }
};
