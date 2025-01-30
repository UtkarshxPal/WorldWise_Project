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

app.use(cors());

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
