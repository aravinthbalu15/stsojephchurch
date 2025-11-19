import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    publicId: { type: String, required: true }, // Cloudinary video ID
  },
  { timestamps: true }
);

export default mongoose.model("Videolink", videoSchema);
