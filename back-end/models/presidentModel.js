import mongoose from 'mongoose';

const presidentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Store the Cloudinary URL of the image
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true, // e.g. President, Bishop, etc.
  }
}, { timestamps: true });

const President = mongoose.model('President', presidentSchema);

export default President;
