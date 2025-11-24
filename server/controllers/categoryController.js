const Category = require("../models/Category");

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required" });

    const categoryExists = await Category.findOne({ name });
    if (categoryExists)
      return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name });

    res.status(201).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
