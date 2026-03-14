const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  note: {
    type: String
  },

  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },

  is_default: {
    type: Boolean,
    default: false
  },

  is_deleted: {
    type: Boolean,
    default: false
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);