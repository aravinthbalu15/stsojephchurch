import mongoose from 'mongoose';

const parishSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['head', 'subhead', 'member'],
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  originalName: { type: String, required: true },
});

const Parish = mongoose.model('Parish', parishSchema);
export default Parish;
