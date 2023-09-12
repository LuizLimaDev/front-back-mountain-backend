const express = require("express");
const routes = express();
const apiHealth = require("../controllers/apiHealth");

routes.get("/", apiHealth);

module.exports = routes;
