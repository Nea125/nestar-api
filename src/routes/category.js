const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category_controller");
const uploadFile = require("../utils/category_multer"); 
const uploadCategory = uploadFile("category");

router.post("/create-category", uploadCategory, categoryController.createCategory);
router.put("/update-category/:id", uploadCategory, categoryController.updateCategory);
router.get("/get-category",categoryController.getCategory);
router.delete("/delete-category/:id", categoryController.deleteCategory);

module.exports = router;
