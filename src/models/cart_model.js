const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },

        total_price: {
          type: Number,
          required: true,
        },

        unit: {
          type: String,
          enum: ["PCS", "KG", "G", "L", "ML", "BOX", "PACK", "BOTTLE"],
          default: "PCS",
        },

        is_deleted: {
          type: Boolean,
          default: false,
        },
      },
    ],

    quantity: {
      type: Number,
      default: 0, // sum of item quantities
    },

    total_price: {
      type: Number,
      default: 0, // sum of item total_prices
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);