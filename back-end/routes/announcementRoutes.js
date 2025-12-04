import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
  incrementViewCount,
} from "../controllers/announcementController.js";

const router = express.Router();

router.post("/", createAnnouncement);
router.get("/", getAnnouncements);
router.get("/:id", getAnnouncementById);
router.put("/:id", updateAnnouncement);
router.delete("/:id", deleteAnnouncement);
router.patch("/:id/view", incrementViewCount);

export default router;
