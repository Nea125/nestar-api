const Product = require("../models/product_model");

exports.addToFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (!product.favorites.includes(userId)) {
      product.favorites.push(userId);
      await product.save();
    } else {
      return res.status(400).json({ message: "Already in favorites" });
    }

    res.json({ message: "Product added to favorites", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUserFavorites = async (req, res) => {
  try {
    const { userId } = req.params; // or from req.user if using auth

    // Find all products where this user is in favorites
    const favoriteProducts = await Product.find({
      favorites: userId,
      is_deleted: false,
      status: "active",
      // latest products first
    }) .sort({ createdAt: -1 }).select("name price images unit rating"); // select fields you want

    res.json({
      status: 1,
      message: "User favorite products",
      data: favoriteProducts,
    });
  } catch (err) {
    res.status(500).json({ status: 0, error: err.message });
  }
};

exports.removeFromFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;
// fine product
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
  // save new product to database that not contain userId
    product.favorites = product.favorites.filter(id => id.toString() !== userId);
    await product.save();

    res.json({ status:1,message: "Product removed from favorites" });
  } catch (err) {
    res.status(500).json({ status:0,error: err.message });
  }
};