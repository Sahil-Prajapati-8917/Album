const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Try to connect to MongoDB Atlas first, fallback to local MongoDB
    let mongoUri = process.env.MONGO_URI;
    
    // If Atlas connection fails, use local MongoDB
    if (!mongoUri || mongoUri.includes('<sahil123>')) {
      mongoUri = 'mongodb://localhost:27017/pixora';
      console.log('Using local MongoDB instance');
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    console.log('Please ensure MongoDB is running locally or update MONGO_URI in .env file');
    // Don't exit the process for demo purposes
    console.log('Server will continue running without database connection');
  }
};

module.exports = connectDB;
