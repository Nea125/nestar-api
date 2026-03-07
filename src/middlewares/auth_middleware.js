
const jwt = require("jsonwebtoken");
const User = require("../models/user_models");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access token missing" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user || user.isDeleted) {
      return res.status(401).json({ message: "Invalid token or user deleted" });
    }

   
    req.user = {
      id: user._id,
      role: user.role,
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalid or expired" });
  }
};

module.exports = authMiddleware;
