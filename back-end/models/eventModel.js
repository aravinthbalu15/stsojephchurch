import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    description_en: { type: String, required: true },
    description_ta: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
