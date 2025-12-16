import express from "express";
import multer from "multer";

import {
  uploadImage,
  getAllImages,
  getImagesByMonth,
  updateImage,
  deleteImage,
} from "../controllers/imageController.js";

const router = express.Router();
const upload = multer(); // memory storage

router.post("/upload-image", upload.single("image"), uploadImage);
router.get("/", getAllImages);
router.get("/month/:month", getImagesByMonth);
router.put("/:id", updateImage);
router.delete("/:id", deleteImage);

export default router;
