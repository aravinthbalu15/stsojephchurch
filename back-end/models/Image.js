import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  month: { type: String, required: true },

  title: {
    en: { type: String, required: true },
    ta: { type: String, required: true },
  },

  description: {
    en: { type: String, required: true },
    ta: { type: String, required: true },
  },

  public_id: { type: String, required: true },
  url: { type: String, required: true },

  width: Number,
  height: Number,
  format: String,

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Image", imageSchema);
