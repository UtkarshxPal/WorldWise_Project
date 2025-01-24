/* eslint-disable no-undef */
const mongoose = require("mongoose");

const citiesSchema = mongoose.Schema({
  cityName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  emoji: {
    type: String,
  },
  date: {
    type: String,
  },
  notes: {
    type: String,
  },
  position: {
    lat: {
      type: String,
    },
    lng: {
      type: String,
    },
  },
});

const cities = mongoose.model("cities", citiesSchema);

module.exports = cities;
