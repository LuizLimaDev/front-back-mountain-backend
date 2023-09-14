const express = require("express");
const routes = express();
const apiHealth = require("../controllers/apiHealth");
const customerRoutes = require("./customer.routes");
const emailController = require("../controllers/emailController");

routes.get("/", apiHealth);
routes.use("/customer", customerRoutes);
routes.get("/email/:email", emailController);

module.exports = routes;
