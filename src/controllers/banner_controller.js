
const Banner = require("../models/banner_model");

exports.uploadBanner = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                status: 0,
                message: "Please upload image"
            });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/banners/${req.file.filename}`;

        const banner = new Banner({
            title: req.body.title,
            image: imageUrl,
            sort_order: req.body.sort_order || 0
        });

        const saved = await banner.save();

        res.status(201).json({
            status: 1,
            message: "success",
            data: saved
        });

    } catch (err) {
        res.status(500).json({
            status: 0,
            error: err.message
        });
    }
};

exports.getBanners = async (req, res) => {
    try {

        const banners = await Banner.find().sort({ createdAt: -1 });

        res.json({
            status: 1,
            data: banners
        });

    } catch (err) {
        res.status(500).json({
            status: 0,
            error: err.message
        });
    }
};

