import cloudinary from 'cloudinary';
import President from '../models/presidentModel.js';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createPresident = async (req, res) => {
  try {
    const { name, description, role } = req.body;
    const file = req.file;

    const uploadResponse = await cloudinary.uploader.upload(file.path, {
      folder: 'president_images',
    });

    const newPresident = new President({
      name,
      role,
      description,
      image: uploadResponse.secure_url,
      cloudinary_id: uploadResponse.public_id,
    });

    await newPresident.save();
    fs.unlinkSync(file.path);
    res.status(201).json(newPresident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload president data" });
  }
};

export const getPresidents = async (req, res) => {
  try {
    const presidents = await President.find();
    res.status(200).json(presidents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch president data" });
  }
};

export const updatePresident = async (req, res) => {
  try {
    const { name, description, role } = req.body;
    const file = req.file;

    const existingPresident = await President.findById(req.params.id);
    if (!existingPresident) return res.status(404).json({ message: "President not found" });

    // If a new image is uploaded, replace the old one
    let updatedImage = existingPresident.image;
    let updatedCloudinaryId = existingPresident.cloudinary_id;

    if (file) {
      // Delete old image
      if (existingPresident.cloudinary_id) {
        await cloudinary.uploader.destroy(existingPresident.cloudinary_id);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(file.path, { folder: 'president_images' });
      updatedImage = result.secure_url;
      updatedCloudinaryId = result.public_id;
      fs.unlinkSync(file.path);
    }

    const updatedPresident = await President.findByIdAndUpdate(
      req.params.id,
      {
        name,
        role,
        description,
        image: updatedImage,
        cloudinary_id: updatedCloudinaryId,
      },
      { new: true }
    );

    res.status(200).json(updatedPresident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update president" });
  }
};

export const deletePresident = async (req, res) => {
  try {
    const president = await President.findById(req.params.id);
    if (!president) return res.status(404).json({ message: "President not found" });

    if (president.cloudinary_id) {
      await cloudinary.uploader.destroy(president.cloudinary_id);
    }

    await President.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "President deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete president" });
  }
};
