import VisitingTime from "../models/vtModel.js";

// Create Visiting Time
export const createVisitingTime = async (req, res) => {
  try {
    const { regularDays, massTimings } = req.body;

    const newVisitingTime = new VisitingTime({
      regularDays,
      massTimings,
    });

    await newVisitingTime.save();
    res.status(201).json({ message: "Visiting Time created successfully", visitingTime: newVisitingTime });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get Visiting Time
export const getVisitingTime = async (req, res) => {
  try {
    const visitingTime = await VisitingTime.findOne();

    if (!visitingTime) {
      return res.status(200).json({
        _id: null,
        regularDays: {
          mondayToFriday: "",
          saturday: "",
          sunday: "",
        },
        massTimings: {
          weekdays: [],
          sunday: [],
        }
      });
    }

    res.status(200).json(visitingTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Update Visiting Time
export const updateVisitingTime = async (req, res) => {
  try {
    const { id } = req.params;
    const { regularDays, massTimings } = req.body;

    const updatedVisitingTime = await VisitingTime.findByIdAndUpdate(id, {
      regularDays,
      massTimings,
    }, { new: true });

    res.status(200).json({ message: "Visiting Time updated", visitingTime: updatedVisitingTime });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete Visiting Time
export const deleteVisitingTime = async (req, res) => {
  try {
    const { id } = req.params;
    await VisitingTime.findByIdAndDelete(id);
    res.status(200).json({ message: "Visiting Time deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
