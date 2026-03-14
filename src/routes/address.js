const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address_controller");

router.post("/set-addess", addressController.setAddress);

router.get("/get-address/:userId", addressController.getUserAddresses);

router.put("/update-addess/:addressId", addressController.updateAddress);

module.exports = router;