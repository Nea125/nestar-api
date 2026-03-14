
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./src/routes/auth");
const requestLogger = require("./src/middlewares/request_logger");
const authMiddleware = require("./src/middlewares/auth_middleware");
const bannerRoutes = require("./src/routes/banner");
const userRoutes = require("./src/routes/user");
const categoryRoutes = require("./src/routes/category");
const productRoutes = require("./src/routes/product");
const cartRoutes = require("./src/routes/cart");
const favouriteRoutes = require("./src/routes/favourite");


const app = express();

// Middleware
app.use(express.json());
app.use(requestLogger);

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
// Middleware run befor route
app.use("/api/auth", authRoutes);
app.use("/api/banner",authMiddleware, bannerRoutes);
app.use("/api/user",authMiddleware,userRoutes); 
app.use("/api/category",authMiddleware,categoryRoutes); 
app.use("/api/product",authMiddleware,productRoutes); 
app.use("/api/cart",authMiddleware,cartRoutes); 
app.use("/api/favourite",authMiddleware,favouriteRoutes); 


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
