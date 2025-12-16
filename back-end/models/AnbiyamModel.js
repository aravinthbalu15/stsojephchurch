import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    ta: { type: String, required: true },
  },
  role: {
    en: { type: String, required: true },
    ta: { type: String, required: true },
  },
  description: {
    en: { type: String },
    ta: { type: String },
  },
  imageUrl: { type: String },
  cloudinaryId: { type: String },
});

const anbiyamSchema = new mongoose.Schema(
  {
    groupNumber: { type: Number, required: true },

    groupTitle: {
      en: { type: String, required: true },
      ta: { type: String, required: true },
    },

    mainTitle: {
      en: { type: String },
      ta: { type: String },
    },

    mainDescription: {
      en: { type: String },
      ta: { type: String },
    },

    mainImageUrl: { type: String },
    mainCloudinaryId: { type: String },

    members: [memberSchema],
  },
  { timestamps: true }
);

const Anbiyam = mongoose.model("Anbiyam", anbiyamSchema);
export default Anbiyam;
