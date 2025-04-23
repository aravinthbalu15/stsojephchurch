import mongoose from 'mongoose';

const FestivalImageSchema = new mongoose.Schema({
  title: String,  // ✅ Added title
  url: String,
  public_id: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('FestivalImage', FestivalImageSchema);
