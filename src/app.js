const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const expertRoutes = require("./routes/expertRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
let dbConnectPromise = null;

const ensureDbConnection = async () => {
  if (mongoose.connection.readyState === 1) return;
  if (!dbConnectPromise) {
    dbConnectPromise = connectDB().finally(() => {
      dbConnectPromise = null;
    });
  }
  await dbConnectPromise;
};

app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  const stateMap = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  res.status(200).json({
    status: "ok",
    database: stateMap[mongoose.connection.readyState] || "unknown",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", (req, res, next) => {
  if (req.path === "/health") return next();
  return ensureDbConnection()
    .then(() => next())
    .catch(() =>
      res.status(503).json({ message: "Database unavailable. Please retry." }),
    );
});

app.use("/api/experts", expertRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

module.exports = app;
