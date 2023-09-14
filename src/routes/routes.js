const express = require("express");
const routes = express();
const apiHealth = require("../controllers/apiHealth");
const { usersRoutes } = require("./users.routes");
const { verifyTheEnvironmentVariables } = require("../middlewares/VerifyTheEnvironmentVariables");

routes.get("/", verifyTheEnvironmentVariables);

routes.get("/", apiHealth);
routes.use("/users", usersRoutes);

module.exports = routes;
