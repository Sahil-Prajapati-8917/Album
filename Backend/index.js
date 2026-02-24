const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/database");

// Database connection is now handled in startServer()
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/albums", require("./routes/albumRoutes"));
app.use("/api/photographers", require("./routes/photographerRoutes"));
app.use("/api/billing", require("./routes/billingRoutes"));

app.get("/", (req, res) => {
  res.send("Pixfolio backend running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log("🚀 Database integration ready");
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
