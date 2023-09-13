const express = require("express");
const routes = express();
const apiHealth = require("../controllers/apiHealth");
const { usersRoutes } = require("./users.routes");

routes.get("/", apiHealth);
routes.use("/users", usersRoutes);

module.exports = routes;
