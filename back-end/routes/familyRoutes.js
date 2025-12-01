const express = require("express");
const router = express.Router();
const { getFamilyStats, updateFamilyStats } = require("../controllers/familyController");

router.get("/", getFamilyStats);
router.put("/", updateFamilyStats);

module.exports = router;
