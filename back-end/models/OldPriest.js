import mongoose from "mongoose";

const oldPriestSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      ta: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      ta: { type: String, required: true },
    },

    // ✅ MANUAL DATE FORMAT (STRING)
    period: { type: String, required: true },

    imageUrl: { type: String, required: true },

    // ✅ SAFE ORDER
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("OldPriest", oldPriestSchema);
