import express from "express";
import multer from "multer";
import {
  uploadEvent,
  getEvents,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";

const router = express.Router();
const upload = multer(); // memory buffer

router.post("/upload", upload.single("image"), uploadEvent);
router.get("/", getEvents);
router.put("/:id", upload.single("image"), updateEvent);
router.delete("/:id", deleteEvent);

export default router;
