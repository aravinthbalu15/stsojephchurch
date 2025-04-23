const cloudinary = require('cloudinary').v2;
const Announcement = require('../models/Announcement'); // ✅ rename 'Image' to 'Announcement'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploadAnnouncement = async (req, res) => {
  try {
    const file = req.file;
    const { title } = req.body;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(fileBuffer);
      });
    };

    const uploadResult = await streamUpload(file.buffer);

    const newAnnouncement = new Announcement({
      title,
      fileUrl: uploadResult.secure_url,
      fileType: uploadResult.resource_type,
      format: uploadResult.format,
    });

    const saved = await newAnnouncement.save();
    res.status(201).json({ message: 'Uploaded successfully', image: saved });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error during upload', error: error.message });
  }
};
