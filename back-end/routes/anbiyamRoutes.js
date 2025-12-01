import express from "express";
import {
  getAllAnbiyams,
  createAnbiyam,
  updateAnbiyam,
  deleteAnbiyam,
} from "../controllers/anbiyamController.js";

const router = express.Router();

// base: /api/anbiyam
router.get("/", getAllAnbiyams);
router.post("/", createAnbiyam);
router.put("/:id", updateAnbiyam);
router.delete("/:id", deleteAnbiyam);

export default router;
