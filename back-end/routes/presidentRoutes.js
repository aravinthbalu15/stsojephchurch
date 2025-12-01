import express from "express";
import { getPresident, updatePresident } from "../controllers/presidentController.js";

const router = express.Router();

router.get("/", getPresident);
router.put("/", updatePresident);

export default router;
