import mongoose from "mongoose";

const acSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      ta: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      ta: { type: String, required: true },
    },
    imageUrl: {
      type: String,
      required: true,
    },
    cloudinaryId: {
      type: String,
      required: true,
    },

    // ✅ ORDER FIELD
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ACMember", acSchema);
