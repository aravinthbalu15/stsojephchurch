import ACMember from '../models/acModel.js';
import cloudinary from '../config/cloudinary.js';

// Create a new member
export const createMember = async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);

    const newMember = new ACMember({
      name,
      description,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all members
export const getMembers = async (req, res) => {
  try {
    const members = await ACMember.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update member
export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await ACMember.findById(id);

    if (!member) return res.status(404).json({ message: "Member not found" });

    if (req.file) {
      // Delete old image
      await cloudinary.uploader.destroy(member.cloudinaryId);

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path);

      member.imageUrl = result.secure_url;
      member.cloudinaryId = result.public_id;
    }

    member.name = req.body.name || member.name;
    member.description = req.body.description || member.description;

    await member.save();
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete member
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await ACMember.findById(id);

    if (!member) return res.status(404).json({ message: "Member not found" });

    await cloudinary.uploader.destroy(member.cloudinaryId);
    await member.deleteOne();

    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
