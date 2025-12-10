import mongoose from "mongoose";

const presidentSchema = new mongoose.Schema(
  {
    head: {
      name: { type: String, required: true },
      description: { type: String },
      imageUrl: { type: String },
      cloudinaryId: { type: String },
    },
    bishop: {
      name: { type: String, required: true },
      description: { type: String },
      description1: { type: String },
      imageUrl: { type: String },
      cloudinaryId: { type: String },
    },
    parishPriest: {
      name: { type: String, required: true },
      description1: { type: String },
      description2: { type: String },
      description3: { type: String },
      imageUrl: { type: String },
      cloudinaryId: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("President", presidentSchema);
