import mongoose from "mongoose";

const visitingTimeSchema = new mongoose.Schema({
  regularDays: {
    mondayToFriday: { type: String, required: true },
    saturday: { type: String, required: true },
    sunday: { type: String, required: true },
  },
  massTimings: {
    weekdays: [{ type: String }],
    sunday: [{ type: String }],
  },
}, { timestamps: true });

const VisitingTime = mongoose.model("VisitingTime", visitingTimeSchema);

export default VisitingTime;
