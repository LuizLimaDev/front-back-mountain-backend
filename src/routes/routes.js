const express = require("express");
const routes = express();
const apiHealth = require("../controllers/apiHealth");
const customersRoutes = require("./customers.routes");
const emailController = require("../controllers/emailController");
const {
	verifyTheEnvironmentVariables,
} = require("../middlewares/verifyTheEnvironmentVariables");

routes.get("/", verifyTheEnvironmentVariables);
const { usersRoutes } = require("./users.routes");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

routes.get("/", apiHealth);
routes.use("/customers", ensureAuthenticated, customersRoutes);

routes.get("/email/:email", emailController);

routes.use("/users", usersRoutes);

module.exports = routes;
