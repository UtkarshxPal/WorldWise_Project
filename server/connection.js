/* eslint-disable no-undef */
const mongoose = require("mongoose");

async function connectToMongo(url) {
  try {
    await mongoose.connect(url);
    console.log("MongoDb Connected");
  } catch (err) {
    console.log("Could not connect to database", err);
    process.exit(1);
  }
}

module.exports = connectToMongo;
