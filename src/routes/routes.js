const express = require("express");
const routes = express();
const apiHealth = require("../controllers/apiHealth");
const { usersRoutes } = require("./users.routes");
const { createUsers } = require("../controllers/usersController");

routes.get("/", apiHealth);
routes.use("/users", usersRoutes, createUsers);

module.exports = routes;
