const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Try to connect to MongoDB Atlas first, fallback to local MongoDB
    let mongoUri = process.env.MONGO_URI;

    // If Atlas connection fails, use local MongoDB
    if (!mongoUri || mongoUri.includes('<sahil123>')) {
      mongoUri = 'mongodb://localhost:27017/pixfolio';
      console.log('Using local MongoDB instance');
    }

    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB Connected Successfully');
    process.env.DB_CONNECTED = 'true';
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);

    if (err.message.includes('tlsv1 alert internal error')) {
      console.error('\n' + '='.repeat(50));
      console.error('DIAGNOSTIC: SSL/TLS Connection Issue Detected');
      console.error('1. Ensure your IP is whitelisted in MongoDB Atlas (Network Access).');
      console.error('2. Check if your ISP or Firewall is blocking port 27017.');
      console.error('3. Try updating Node.js to the latest LTS version.');
      console.error('='.repeat(50) + '\n');
    } else if (err.message.includes('SSL') || err.message.includes('TLS')) {
      console.log('TIP: This looks like a TLS/SSL issue. Check your network or MongoDB Atlas whitelist.');
    }

    console.log('Please ensure MongoDB is running locally or update MONGO_URI in .env file');
    process.env.DB_CONNECTED = 'false';
    // Don't exit the process, let the app run but indicate status
  }
};

module.exports = connectDB;
