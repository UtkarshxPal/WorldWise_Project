/* eslint-disable no-undef */

const express = require("express");
const connectToMongo = require("./connection");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cityRouter = require("./routes/cities");
const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/", cityRouter);
app.listen(PORT, () => {
  console.log("server started");
});
