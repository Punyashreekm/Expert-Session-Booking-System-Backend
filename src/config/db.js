const mongoose = require("mongoose");

mongoose.set("bufferCommands", false);

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured in environment variables");
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    throw new Error(
      `MongoDB connection failed: ${error.message}. Check MONGODB_URI, network access, and Atlas IP whitelist.`,
    );
  }
};

module.exports = connectDB;
