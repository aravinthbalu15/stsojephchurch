import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },           // தலைவர் / Secretary / Treasurer
  description: { type: String },
  imageUrl: { type: String },
  cloudinaryId: { type: String },
});

const anbiyamSchema = new mongoose.Schema(
  {
    groupNumber: { type: Number, required: true },   // 1 – 7
    groupTitle: { type: String, required: true },    // e.g. புனித சூசையப்பர் அன்பியம்

    members: [memberSchema],

    mainImageUrl: { type: String },
    mainCloudinaryId: { type: String },
    mainTitle: { type: String },
    mainDescription: { type: String },
  },
  { timestamps: true }
);

const Anbiyam = mongoose.model("Anbiyam", anbiyamSchema);
export default Anbiyam;
