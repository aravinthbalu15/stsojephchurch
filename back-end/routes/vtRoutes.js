import express from "express";
import { createVisitingTime, getVisitingTime, updateVisitingTime, deleteVisitingTime } from "../controllers/vtController.js";

const router = express.Router();

router.post("/", createVisitingTime);
router.get("/", getVisitingTime);
router.put("/:id", updateVisitingTime);
router.delete("/:id", deleteVisitingTime);

export default router;
