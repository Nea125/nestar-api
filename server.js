const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./src/routes/auth");

const requestLogger = require("./src/middlewares/request_logger");
const authMiddleware = require("./src/middlewares/auth_middleware"); // import middleware

const app = express();

// Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

