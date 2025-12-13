// models/OldPriest.js
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
    dob_start: { type: Date, required: true },
    dob_end: { type: Date, required: true },
    imageUrl: { type: String, required: true },
    order: { type: Number, required: true }, // ⭐ upload order
  },
  { timestamps: true }
);

export default mongoose.model("OldPriest", oldPriestSchema);
