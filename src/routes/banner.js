const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const bannerController = require('../controllers/banner_controller');

// This will accept image, file, banner, photo, img, or picture as field name
router.post('/upload-banner', upload.acceptImage(), bannerController.uploadBanner).get('/get-banner', bannerController.getBanners);;


module.exports = router;