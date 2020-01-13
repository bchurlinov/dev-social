const express = require("express");
const connectDB = require("./config/connectDB");
const cors = require("cors");

// Initialize Express
const app = express();

// Set CORS
app.use(cors());

// Connect DB
connectDB();

// Initialize Middleware
app.use(express.json({extended: false}));

// Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))