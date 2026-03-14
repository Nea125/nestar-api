const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favourite_controller");
router.post("/add-to-favourite", favoriteController.addToFavorite);
router.get("/get-user-favourite/:userId", favoriteController.getUserFavorites);
router.delete("/remove-favourite", favoriteController.removeFromFavorite);


module.exports = router;