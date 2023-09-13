const express = require("express");
const routes = express();
const apiHealth = require("../controllers/apiHealth");
const customerRoutes = require("./customer.routes");

routes.get("/", apiHealth);
routes.use("/customer", customerRoutes);

module.exports = routes;
