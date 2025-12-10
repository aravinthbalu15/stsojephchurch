const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // memory buffer

const {
  uploadEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

router.post("/upload", upload.single("image"), uploadEvent);
router.get("/", getEvents);
router.put("/:id", upload.single("image"), updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
