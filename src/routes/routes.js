const express = require("express");
const routes = express();
const apiHealth = require("../controllers/apiHealth");
const customersRoutes = require("./customers.routes");
const emailController = require("../controllers/emailController");
const {
	verifyTheEnvironmentVariables,
} = require("../middlewares/VerifyTheEnvironmentVariables");

routes.get("/", verifyTheEnvironmentVariables);
const { usersRoutes } = require("./users.routes");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const {
	validateRequestParams,
} = require("../middlewares/validateRequestParams");
const { validateEmail } = require("../schemas/userSchema");
const chargesRoutes = require("./charges.routes");

routes.get("/", apiHealth);
routes.use("/customers", ensureAuthenticated, customersRoutes);

routes.get(
	"/email/:email",
	validateRequestParams(validateEmail),
	emailController
);

routes.use("/users", usersRoutes);
routes.use("/charges", ensureAuthenticated, chargesRoutes);

module.exports = routes;
