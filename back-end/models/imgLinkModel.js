// models/imgLinkModel.js
import mongoose from 'mongoose';

const imgLinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  cloudinaryId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('ImgLink', imgLinkSchema);
