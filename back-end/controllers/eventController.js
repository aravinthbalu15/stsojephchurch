// ❌ DELETE THIS BLOCK — it's not needed
const Event = require('../models/eventModel');
exports.uploadImage = async (req, res) => {
  try {
    const { category, title, description } = req.body;
    const imageData = req.file.buffer.toString('base64');
    const imageType = req.file.mimetype;

    const newImage = new Image({ category, title, description, imageData, imageType });
    await newImage.save();

    res.status(201).json({ message: 'Image uploaded successfully', image: newImage });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
};
