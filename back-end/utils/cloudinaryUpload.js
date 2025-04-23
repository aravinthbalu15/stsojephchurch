// utils/cloudinaryUpload.js
const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (fileBuffer, fileType, folder = 'announcements') => {
  return await cloudinary.uploader.upload_stream({
    resource_type: fileType, // 'auto' for all types
    folder: folder,
  }, (error, result) => {
    if (error) throw error;
    return result;
  });
};

module.exports = uploadToCloudinary;
