import express from "express";
import multer from "multer";
import {
  uploadImage,
  getImages,
  updateImage,
  deleteImage,
} from "../controllers/heartConventController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), uploadImage);
router.get("/", getImages);
router.put("/:id", updateImage);
router.delete("/:id", deleteImage);

export default router;
