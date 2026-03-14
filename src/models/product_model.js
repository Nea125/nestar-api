const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
    // inventory
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    // unit type (banana, water, rice...)
    unit: {
      type: String,
      enum: ["PCS", "KG", "G", "L", "ML", "BOX", "PACK", "BOTTLE"],
      default: "PCS",
    },

    images: [
      {
        url: { type: String, required: true },
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    product_detail: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// index for faster search
productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);