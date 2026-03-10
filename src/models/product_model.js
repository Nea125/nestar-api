const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // reference to Category collection
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    images: [
      {
        url: { type: String, required: true }, // image URL
        alt: { type: String, default: "" },   // optional alt text
      },
    ],

    weight: {
      type: Number,   // in grams, optional
      default: null,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // users who favorited this product
      },
    ],

    product_detail: {
      type: mongoose.Schema.Types.Mixed, // flexible object for extra details (size, color, etc.)
      default: {},
    },
    is_deleted:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("Product", productSchema);