import mongoose from "mongoose";

// Reusable bilingual field structure
const bilingual = {
  en: { type: String, default: "" },
  ta: { type: String, default: "" },
};

const presidentSchema = new mongoose.Schema(
  {
    head: {
      name: bilingual,
      description1: bilingual,
      description2: bilingual,
      description3: bilingual,
      image: { type: String },
    },

    bishop: {
      name: bilingual,
      description1: bilingual,
      description2: bilingual,
      description3: bilingual,
      image: { type: String },
    },

    parishPriest: {
      name: bilingual,
      description1: bilingual,
      description2: bilingual,
      description3: bilingual,
      image: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("President", presidentSchema);
