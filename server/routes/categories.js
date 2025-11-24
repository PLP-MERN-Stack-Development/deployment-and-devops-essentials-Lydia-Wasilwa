const express = require("express");
const router = express.Router();
const { createCategory, getCategories } = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");

// Routes
router.post("/", protect, createCategory); // Only logged-in user can create category
router.get("/", getCategories);

module.exports = router;
