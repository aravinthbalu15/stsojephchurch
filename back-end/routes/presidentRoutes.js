import express from "express";
import {
  createPresident,
  getPresident,
  updatePresident,
  deletePresident,
  deleteSection
} from "../controllers/presidentController.js";

const router = express.Router();

router.post("/", createPresident);
router.get("/", getPresident);
router.put("/", updatePresident);
router.delete("/", deletePresident);

// Delete specific section
router.delete("/section/:section", deleteSection);

export default router;
