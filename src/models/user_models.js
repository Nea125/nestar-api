const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  refreshToken: { type: String, default: null },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  otp: String,
  otpExpires: Date,
  provider: { 
    type: String, 
    enum: ["email", "google", "facebook", "apple"], 
    default: "email" 
  },
  providerId: { type: String }, // e.g., Google sub, Facebook id, Apple sub

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
