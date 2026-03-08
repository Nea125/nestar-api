

const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    title: String,
    sort_order: Number,
    image: String
}, {
    timestamps: true
});

module.exports = mongoose.model("Banner", bannerSchema);