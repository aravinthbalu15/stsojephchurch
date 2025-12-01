const Family = require("../models/familyModel");

// Get counts
exports.getFamilyStats = async (req, res) => {
  try {
    const stats = await Family.findOne();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error });
  }
};

// Update counts
exports.updateFamilyStats = async (req, res) => {
  try {
    const { families, anbiyams } = req.body;

    const updated = await Family.findOneAndUpdate(
      {},
      { families, anbiyams },
      { new: true, upsert: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating stats", error });
  }
};
