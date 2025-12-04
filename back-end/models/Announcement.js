import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: "general" },
    imageUrl: { type: String, default: "" },
    pdfUrl: { type: String, default: "" },

    eventDate: { type: Date },
    expiryDate: { type: Date },

    isActive: { type: Boolean, default: true },
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Announcement =
  mongoose.models.Announcement ||
  mongoose.model("Announcement", announcementSchema);

export default Announcement;
