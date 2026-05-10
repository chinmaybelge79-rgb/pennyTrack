const mongoose = require('mongoose');

/**
 * Connect to MongoDB using Mongoose.
 * Reads the connection string from the MONGODB_URI environment variable.
 * Exits the process on connection failure.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
