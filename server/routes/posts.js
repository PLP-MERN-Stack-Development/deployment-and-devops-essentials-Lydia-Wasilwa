const express = require("express");
const router = express.Router();
const { createPost, getPosts, getPostBySlug } = require("../controllers/postController");

// Routes
router.post("/", createPost);
router.get("/", getPosts);
router.get("/:slug", getPostBySlug);

module.exports = router;
