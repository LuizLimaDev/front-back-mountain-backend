const express = require("express");
const routes = express();
const apiHealth = require("../controllers/apiHealth");
const customerRoutes = require("./customer.routes");
const emailController = require("../controllers/emailController");
const {
	verifyTheEnvironmentVariables,
} = require("../middlewares/VerifyTheEnvironmentVariables");

routes.get("/", verifyTheEnvironmentVariables);

routes.get("/", apiHealth);
routes.use("/customer", customerRoutes);
routes.get("/email/:email", emailController);

module.exports = routes;
