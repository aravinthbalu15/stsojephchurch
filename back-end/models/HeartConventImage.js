import mongoose from "mongoose";

const heartConventSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      ta: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      ta: { type: String, required: true },
    },
    imageUrl: { type: String, required: true },
    cloudinaryId: { type: String, required: true },

    // ✅ ORDER (first upload → first show)
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("HeartConventImage", heartConventSchema);
