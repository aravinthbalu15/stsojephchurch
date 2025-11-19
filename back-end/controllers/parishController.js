import Parish from '../models/parishModel.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

export const createParishMember = async (req, res) => {
  try {
    const { category, name, description } = req.body;
    const imagePath = req.file.path;

    const uploaded = await cloudinary.uploader.upload(imagePath, {
      folder: "parish_members"
    });

    const newMember = new Parish({
      category,
      name,
      description,
      imageUrl: uploaded.secure_url,
      originalName: name,
    });

    await newMember.save();
    fs.unlinkSync(imagePath); // clean up local file
    res.status(201).json(newMember);
  } catch (error) {
    console.error("Error creating parish member:", error);
    res.status(500).json({ message: 'Failed to create parish member' });
  }
};

export const getParishMembers = async (req, res) => {
  try {
    const parishMembers = await Parish.find({});
    res.status(200).json(parishMembers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch parish members' });
  }
};

export const updateParishMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, name, description } = req.body;

    const updateFields = {
      category,
      name,
      description,
    };

    if (req.file) {
      const imagePath = req.file.path;
      const uploaded = await cloudinary.uploader.upload(imagePath, {
        folder: "parish_members"
      });
      updateFields.imageUrl = uploaded.secure_url;
      fs.unlinkSync(imagePath);
    }

    const updatedMember = await Parish.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!updatedMember) return res.status(404).json({ message: 'Member not found' });

    res.status(200).json(updatedMember);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: 'Update failed' });
  }
};

export const deleteParishMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Parish.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: 'Not found' });

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed' });
  }
};
