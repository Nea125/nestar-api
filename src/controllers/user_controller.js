const User = require("../models/user_models");

exports.getMe = async (req, res) => {
  try {
   const userId = req.user.id; // Get user ID from auth middleware
    // ignore password and refreshToken fields when respon
    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
      return res.status(404).json({ status: 0, message: "User not found" });
    }

    res.json({
        message: "Success",
      status: 1,
      data: user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
