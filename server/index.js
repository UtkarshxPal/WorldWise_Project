/* eslint-disable no-undef */

const express = require("express");
const connectToMongo = require("./connection");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const compression = require("compression");
const cityRouter = require("./routes/cities");
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./Middlewares/auth");
const app = express();

const allowedOrigins = [
  "http://localhost:5173", // Development
  "https://your-deployed-frontend-url.com", // Production
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Blocked by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(checkForAuthentication);

app.use("/user", authRouter);
app.use("/cities", restrictTo("User"), cityRouter);

app.listen(PORT, () => {
  console.log("server started on port", PORT);
});
