const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart_controller");

router.post("/add-to-cart", cartController.addToCart);
router.get("/get-cart/:userId", cartController.getCart);
router.delete("/remove-item/:itemId", cartController.removeCartItem);
router.delete("/clear-cart/:userId",cartController.clearCart);

module.exports = router;