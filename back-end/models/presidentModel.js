import mongoose from "mongoose";

const langField = {
  en: { type: String, default: "" },
  ta: { type: String, default: "" },
};

const presidentSchema = new mongoose.Schema(
  {
    head: {
      name: langField,
      description1: langField,
      description2: langField,
      description3: langField,
      imageUrl: String,
      cloudinaryId: String,
    },

    bishop: {
      name: langField,
      description1: langField,
      description2: langField,
      description3: langField,
      imageUrl: String,
      cloudinaryId: String,
    },

    parishPriest: {
      name: langField,
      description1: langField,
      description2: langField,
      description3: langField,
      imageUrl: String,
      cloudinaryId: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("President", presidentSchema);
