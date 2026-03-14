const express = require("express");
const router = express.Router();

const productController = require("../controllers/product_controller");
const uploadFile = require("../utils/product_multer");

const uploadProduct = uploadFile("product");

router.post("/create-product", uploadProduct, productController.createProduct);
router.put("/update-product/:id", uploadProduct, productController.updateProduct);
router.get("/get-products", productController.getProducts);
router.get("/get-product/:id", productController.getProductById);
router.delete("/delete-product/:id", productController.deleteProduct);

module.exports = router;