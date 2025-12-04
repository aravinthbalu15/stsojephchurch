import VisitingTime from "../models/vtModel.js";

// Create Visiting Time (Only one record)
export const createVisitingTime = async (req, res) => {
  try {
    const existing = await VisitingTime.findOne();
    if (existing) return res.status(400).json({ message: "Visiting time already exists!" });

    const newVisitingTime = new VisitingTime(req.body);
    await newVisitingTime.save();
    res.status(201).json({ message: "Visiting Time created successfully", visitingTime: newVisitingTime });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get Visiting Time
export const getVisitingTime = async (req, res) => {
  try {
    const visitingTime = await VisitingTime.findOne();
    res.status(200).json(visitingTime); // returns null if none exists
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update Visiting Time (with upsert)
export const updateVisitingTime = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVisitingTime = await VisitingTime.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Visiting Time updated",
      visitingTime: updatedVisitingTime,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete
export const deleteVisitingTime = async (req, res) => {
  try {
    const { id } = req.params;
    await VisitingTime.findByIdAndDelete(id);
    res.status(200).json({ message: "Visiting Time deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
