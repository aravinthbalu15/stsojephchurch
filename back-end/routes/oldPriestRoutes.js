import express from "express";
import multer from "multer";
import {
  addOldPriest,
  getAllOldPriests,
  deleteOldPriest,
  editOldPriest,
} from "../controllers/oldPriestController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/old", upload.single("image"), addOldPriest);
router.get("/", getAllOldPriests);
router.delete("/:id", deleteOldPriest);
router.put("/:id", upload.single("image"), editOldPriest);

export default router;
