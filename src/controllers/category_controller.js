const Category = require("../models/category_model");

exports.createCategory = async (req, res) => {
  try {
    const { name, description, sort_order } = req.body;

    // Check if category exists
    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ status: 0, message: "Category already exists" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/category/${req.file.filename}`;


    const category = new Category({
      name,
      description: description || "",
      image: imageUrl,
      sort_order: sort_order || 0,
    });

    const savedCategory = await category.save();

    res.status(201).json({
      status: 1,
      message: "Category created successfully",
      data: savedCategory,
    });
  } catch (err) {
    res.status(500).json({ status: 0, error: err.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find({ is_deleted: false }).sort({ sort_order: 1, createdAt: -1 });
    res.json({
      status: 1,
      data: categories,
    });
  } catch (err) {
    res.status(500).json({ status: 0, error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updates = req.body;

    if (req.file) {
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/category/${req.file.filename}`;
      updates.image = imageUrl;
    }

    const updated = await Category.findByIdAndUpdate(categoryId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ status: 0, message: "Category not found" });
    }

    res.json({
      status: 1,
      message: "Category updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ status: 0, error: err.message });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const deleted = await Category.findByIdAndUpdate(categoryId, { is_deleted: true }, { new: true });

    if (!deleted) {
      return res.status(404).json({ status: 0, message: "Category not found" });
    }

    res.json({
      status: 1,
      message: "Category deleted successfully",
      data: deleted,
    });
  } catch (err) {
    res.status(500).json({ status: 0, error: err.message });
  }
};
