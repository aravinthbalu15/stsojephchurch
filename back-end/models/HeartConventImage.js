import mongoose from 'mongoose';

const heartConventImageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  cloudinaryId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("HeartConventImage", heartConventImageSchema);
