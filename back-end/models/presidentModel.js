import mongoose from "mongoose";

const bilingual = {
  en: { type: String, default: "" },
  ta: { type: String, default: "" },
};

const sectionSchema = {
  name: bilingual,
  description1: bilingual,
  description2: bilingual,
  description3: bilingual,
  image: { type: String, default: "" },
};

const presidentSchema = new mongoose.Schema(
  {
    head: sectionSchema,
    bishop: sectionSchema,
    parishPriest: sectionSchema,
  },
  { timestamps: true }
);

export default mongoose.model("President", presidentSchema);
