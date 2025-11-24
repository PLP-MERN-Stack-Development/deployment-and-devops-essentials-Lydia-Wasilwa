const Post = require("../models/Post");

// Create post
exports.createPost = async (req, res) => {
  try {
    const { title, content, author, category, tags, excerpt, featuredImage } = req.body;

    if (!title || !content || !author || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, content, author, and category are required."
      });
    }

    const post = await Post.create({
      title,
      content,
      author,
      category,
      tags,
      excerpt,
      featuredImage
    });

    res.status(201).json({ success: true, post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")  // joins User
      .populate("category", "name")      // joins Category
      .sort({ createdAt: -1 });

    res.json({ success: true, count: posts.length, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Get single post by slug
exports.getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate("author", "name email")
      .populate("category", "name");

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // increment view count
    post.viewCount++;
    await post.save();

    res.json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
