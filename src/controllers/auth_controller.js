const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user_models");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: 0, message: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Success",
      status: 1,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },

    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.isDeleted) {
      return res.status(400).json({ status: 0, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: 0, message: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_RESFRESH_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      message: "Success",
      status: 1,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        accessToken,
        refreshToken
      }


    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// REFRESH TOKEN
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ status: 0, message: "Refresh token required" });
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ status: 0, message: "Invalid refresh token" });
    }

    jwt.verify(refreshToken, process.env.JWT_RESFRESH_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ status: 0, message: "Refresh token expired or invalid" });

      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ status: 1, message: "Success", data: { accessToken } });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
