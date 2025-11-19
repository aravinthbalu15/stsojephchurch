import Videolink from "../models/videoLinkModel.js";
import cloudinary from "../config/cloudinary.js";

// Upload Video
export const uploadVideo = async (req, res) => {
  try {
    const { title, videoBase64 } = req.body;

    if (!videoBase64) {
      return res.status(400).json({ message: "Video data missing" });
    }

    const uploadResult = await cloudinary.uploader.upload(videoBase64, {
      resource_type: "video",
      folder: "videoLink",
    });

    const video = await Videolink.create({
      title,
      videoUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });

    res.status(201).json(video);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Video upload failed" });
  }
};

// Get All Videos
export const getVideos = async (req, res) => {
  try {
    const videos = await Videolink.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};

// Edit Video
export const editVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, videoBase64 } = req.body;

    const video = await Videolink.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // If new video uploaded, replace it
    if (videoBase64) {
      await cloudinary.uploader.destroy(video.publicId, {
        resource_type: "video",
      });

      const uploadResult = await cloudinary.uploader.upload(videoBase64, {
        resource_type: "video",
        folder: "videoLink",
      });

      video.videoUrl = uploadResult.secure_url;
      video.publicId = uploadResult.public_id;
    }

    video.title = title || video.title;
    await video.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// Delete Video
export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Videolink.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(video.publicId, {
      resource_type: "video",
    });

    await video.deleteOne();

    res.json({ message: "Video deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
