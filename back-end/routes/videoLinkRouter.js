import express from "express";
import {
  uploadVideo,
  getVideos,
  editVideo,
  deleteVideo,
} from "../controllers/videoLinkController.js";

const router = express.Router();

// Upload Video
router.post("/", uploadVideo);

// Get All Videos
router.get("/", getVideos);

// Edit Video
router.put("/:id", editVideo);

// Delete Video
router.delete("/:id", deleteVideo);

export default router;
