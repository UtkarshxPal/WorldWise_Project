/* eslint-disable no-undef */
const express = require("express");
const {
  handleCreateCity,
  handleGetCities,
  handleGetCity,
  handleDelete,
} = require("../controllers/cities");

const cityRouter = express.Router();

cityRouter.delete("/:id", handleDelete);
cityRouter.get("/:id", handleGetCity);
cityRouter.post("/", handleCreateCity);
cityRouter.get("/", handleGetCities);

module.exports = cityRouter;
