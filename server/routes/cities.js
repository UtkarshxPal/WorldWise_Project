/* eslint-disable no-undef */
const express = require("express");
const {
  handleCreateCity,
  handleGetCities,
  handleGetCity,
  handleDelete,
} = require("../controllers/cities");

const cityRouter = express.Router();

cityRouter.delete("/cities/:id", handleDelete);
cityRouter.get("/cities/:id", handleGetCity);
cityRouter.post("/cities", handleCreateCity);
cityRouter.get("/cities", handleGetCities);

module.exports = cityRouter;
