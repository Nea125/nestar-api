const Product = require("../models/product_model");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, price, weight, product_detail } = req.body;

    const existing = await Product.findOne({ name });
    if (existing) {
      return res.status(400).json({
        status: 0,
        message: "Product already exists",
      });
    }

    // handle multiple images
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => ({
        url: `${req.protocol}://${req.get("host")}/uploads/product/${file.filename}`,
        alt: name,
      }));
    }

    const product = new Product({
      name,
      description: description || "",
      category,
      price,
      weight: weight || null,
      product_detail: product_detail || {},
      images,
    });

    const savedProduct = await product.save();

    res.status(201).json({
      status: 1,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name") // get category name
      .sort({ createdAt: -1 });

    res.json({
      massage:"success",
      status: 1,
      data: products,
      count:products.length
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");

    if (!product) {
      return res.status(404).json({
        status: 0,
        message: "Product not found",
      });
    }

    res.json({
      massage:"success",
      status: 1,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    if (req.files && req.files.length > 0) {
      updates.images = req.files.map((file) => ({
        url: `${req.protocol}://${req.get("host")}/uploads/product/${file.filename}`,
        alt: updates.name || "",
      }));
    }

    const updated = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        status: 0,
        message: "Product not found",
      });
    }

    res.json({
      massage:"success",
      status: 1,
      message: "Product updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Soft delete: set is_deleted = true
    const deleted = await Product.findByIdAndUpdate(
      productId,
      { is_deleted: true }, // mark as deleted
      { new: true }
    );

    if (!deleted) {
      return res.status(404).json({
        status: 0,
        message: "Product not found",
      });
    }

    res.json({
      status: 1,
      message: "Product deleted successfully",
      data: deleted,
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};