import mongoose from 'mongoose';

const oldPriestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dob_start: { type: Date, required: true },
  dob_end: { type: Date, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('OldPriest', oldPriestSchema);
