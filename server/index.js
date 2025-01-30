/* eslint-disable no-undef */

const express = require("express");
const connectToMongo = require("./connection");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cityRouter = require("./routes/cities");
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./Middlewares/auth");
const app = express();

const allowedOrigins = [
  "https://travel-management-worldwise-frontend.onrender.com",
  "https://travel-management-worldwise-react.onrender.com",
  "http://localhost:5173", // local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Added OPTIONS
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    exposedHeaders: ["Set-Cookie"],
    preflightContinue: true,
  })
);

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/worldWise",
      {}
    );
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
  console.log("server started");
});
