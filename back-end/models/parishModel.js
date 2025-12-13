import mongoose from "mongoose";

const parishSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["head", "subhead", "member"],
      required: true,
    },

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

    // ✅ ORDER PER CATEGORY
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Parish", parishSchema);
