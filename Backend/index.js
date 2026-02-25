const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/database");

// Fail fast if critical env vars are missing
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.includes('change-this')) {
  console.error('❌ FATAL: JWT_SECRET is not set or is using a default value. Set a strong secret in .env');
  process.exit(1);
}

const app = express();

// Security Middleware
app.use(helmet()); // Sets security headers (X-Frame-Options, CSP, HSTS, etc.)

// Inline NoSQL injection sanitizer (express-mongo-sanitize is incompatible with Express 5)
const sanitizeObject = (obj) => {
  if (obj && typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      if (key.startsWith('$')) {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        sanitizeObject(obj[key]);
      }
    }
  }
};
app.use((req, res, next) => {
  if (req.body) sanitizeObject(req.body);
  if (req.params) sanitizeObject(req.params);
  next();
});

// CORS — restrict to known origins
const allowedOrigins = [
  'http://localhost:5173',  // Vite dev server
  'http://localhost:3000',
  process.env.FRONTEND_URL, // Production frontend URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing with size limit (prevents large payload DoS attacks)
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/albums", require("./routes/albumRoutes"));
app.use("/api/photographers", require("./routes/photographerRoutes"));
app.use("/api/billing", require("./routes/billingRoutes"));

// Serve static uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    dbConnected: process.env.DB_CONNECTED === 'true'
  });
});

app.get("/", (req, res) => {
  res.send("Pixfolio backend running");
});

// Error handling middleware — sanitize error output in production
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Don't leak error details in production
  const isDev = process.env.NODE_ENV !== 'production';
  res.status(err.status || 500).json({
    success: false,
    message: isDev ? err.message : 'Something went wrong!'
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log("🚀 Database integration ready");
      console.log(`🛡️  Security: Helmet, CORS, Mongo-Sanitize enabled`);
    });

    // Graceful shutdown
    const shutdown = (signal) => {
      console.log(`\n📴 ${signal} received. Shutting down gracefully...`);
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
      // Force close after 10s
      setTimeout(() => {
        console.error('⚠️  Forcing shutdown...');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
