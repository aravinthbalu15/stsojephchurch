import mongoose from 'mongoose';

const acSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const ACMember = mongoose.model('ACMember', acSchema);

export default ACMember;
