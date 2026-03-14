const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, 
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String, 
      default: "",
    },
    sort_order: {
      type: Number,
      default: 0, 
    },
    is_deleted: { 
      type: Boolean, 
      default: false 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);