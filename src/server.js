require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5500;

const startServer = async () => {
  try {
    await connectDB();

    mongoose.connection.on("disconnected", () => {
      console.error("MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
