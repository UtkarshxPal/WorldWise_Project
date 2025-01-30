/* eslint-disable no-undef */
const cities = require("../models/cities");

async function handleCreateCity(req, res) {
  try {
    const { cityName, country, emoji, date, notes, position } = req.body;
    const userId = req.user._id;
    console.log(req.user._id, "user id from created city");

    if (!cityName)
      return res.status(400).json({ message: "City name is required" });

    const newCity = await cities.create({
      cityName,
      country,
      emoji,
      date,
      notes,
      position,
      userId,
    });

    return res
      .status(200)
      .json({ message: "City created succesfully", city: newCity });
  } catch (err) {
    console.log("error in creating city", err);
    return res.status(500).json({
      message: "Failed to create city",
      error: err.message,
    });
  }
}

async function handleGetCities(req, res) {
  const userId = req.user._id;
  try {
    const allCities = await cities.find({ userId: userId });
    console.log(allCities, "allcities");

    return res.status(200).json(allCities);
  } catch (err) {
    console.log("Failed to fetch Cities");
    return res
      .status(500)
      .json({ message: "Failed to fetch cities", error: err.message });
  }
}

async function handleGetCity(req, res) {
  const id = req.params.id;

  try {
    const city = await cities.findOne({ _id: id });
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }
    const {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    } = city;

    return res.status(200).json({
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Could not find city", error: err.message });
  }
}

async function handleDelete(req, res) {
  const id = req.params.id;
  const userId = req.user._id;
  try {
    const city = await cities.findOneAndDelete({ userId: userId, _id: id });

    if (!city) {
      return res.status(404).json({ message: "Could not find city" });
    }

    return res
      .status(200)
      .json({ message: "City succesfully deleted", city: city });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Could not delete city", error: err.message });
  }
}

module.exports = {
  handleCreateCity,
  handleGetCities,
  handleGetCity,
  handleDelete,
};
