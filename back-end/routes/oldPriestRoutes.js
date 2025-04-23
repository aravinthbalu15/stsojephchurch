import express from 'express';
import multer from 'multer';
import { addOldPriest, getAllOldPriests, deleteOldPriest, editOldPriest } from '../controllers/oldPriestController.js';
const router = express.Router();

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Add a new priest
router.post("/old", upload.single("image"), addOldPriest);

// Get all priests
router.get("/", getAllOldPriests);

// Delete a priest
router.delete("/:id", deleteOldPriest);

// Edit a priest
router.put("/:id", upload.single("image"), editOldPriest);

export default router;
