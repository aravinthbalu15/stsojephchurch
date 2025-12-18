import express from "express";
import {
  getPresident,
  updatePresident,
  deleteSection,
} from "../controllers/presidentController.js";

const router = express.Router();

router.get("/", getPresident);
router.put("/", updatePresident);
router.delete("/section/:section", deleteSection);

export default router;
