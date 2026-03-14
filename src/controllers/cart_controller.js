const Cart = require("../models/cart_model");
const Product = require("../models/product_model");

exports.addToCart = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;
    const qty = quantity && quantity > 0 ? quantity : 1;

    const productData = await Product.findById(product);
    if (!productData) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user, is_deleted: false });

    if (!cart) {
      cart = new Cart({ user, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === product
    );

    if (itemIndex > -1) {
      // update existing item
      cart.items[itemIndex].quantity += qty;
      cart.items[itemIndex].total_price =
        cart.items[itemIndex].quantity * productData.price;
    } else {
      // add new item
      cart.items.push({
        product,
        quantity: qty,
        total_price: productData.price * qty,
        unit: productData.unit || "PCS",
      });
    }

    // recalc totals
    cart.quantity = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    cart.total_price = cart.items.reduce((sum, i) => sum + i.total_price, 0);

    await cart.save();

    res.json({
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product", "name price unit_type") // product info
      .populate("user", "username email"); // user info

    if (!cart) {
      return res.status(404).json({
        status: 0,
        message: "Cart not found",
      });
    }

    // Filter out soft-deleted items but keep _id for each item
    const items = cart.items
      .filter(item => !item.is_deleted)
      .map(item => ({
        _id: item._id,         // item ID for remove/update
        product: item.product,
        quantity: item.quantity,
        price: item.price,
        unit_type: item.unit_type
      }));

    res.json({
      status: 1,
      data: {
        _id: cart._id,
        user: cart.user,
        items,
        total: cart.total,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt
      }
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ "items._id": itemId });

    if (!cart) {
      return res.status(404).json({
        status: 0,
        message: "Cart or item not found",
      });
    }

    // mark item as deleted
    cart.items.forEach((item) => {
      if (item._id.toString() === itemId) {
        item.is_deleted = true;
      }
    });

    // recalculate total (ignore deleted items)
    cart.total = cart.items
      .filter((item) => !item.is_deleted)
      .reduce((sum, item) => sum + item.quantity * item.price, 0);

    await cart.save();

    res.json({
      status: 1,
      message: "Item removed from cart"
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};

// Clear

// Soft delete all items in a cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId, is_deleted: false });
    if (!cart) {
      return res.status(404).json({ status: 0, message: "Cart not found" });
    }

    // Mark all items as deleted
    cart.items.forEach((item) => {
      item.is_deleted = true;
    });

    await cart.save();

    res.json({
      status: 1,
      message: "success",
      cart,
    });
  } catch (err) {
    res.status(500).json({ status: 0, error: err.message });
  }
};